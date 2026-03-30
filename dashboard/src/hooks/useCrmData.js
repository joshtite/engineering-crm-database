import { useCallback, useEffect, useState } from 'react'
import { getSupabase } from '../lib/supabaseClient'

function formatCurrency(value) {
  if (value == null || Number.isNaN(Number(value))) return '—'
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Number(value))
}

function formatDate(value) {
  if (!value) return '—'
  try {
    return new Date(value).toLocaleDateString()
  } catch {
    return String(value)
  }
}

function emptySummary() {
  return {
    projectCount: 0,
    clientCount: 0,
    taskCount: 0,
    inProgressProjects: 0,
    openTasks: 0,
    totalBudgetDisplay: formatCurrency(0),
    avgBudgetDisplay: formatCurrency(0),
  }
}

async function fetchCrmData() {
  const supabase = getSupabase()
  if (!supabase) {
    return {
      error:
        'Missing Supabase configuration. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env',
      projects: [],
      clientsWithBudget: [],
      tasks: [],
      summary: emptySummary(),
    }
  }

  const [projectsRes, clientsRes, tasksRes] = await Promise.all([
    supabase
      .from('projects')
      .select('project_id, project_name, status, budget, client_id')
      .order('project_name'),
    supabase.from('clients').select('client_id, company_name').order('company_name'),
    supabase
      .from('tasks')
      .select('task_id, project_id, title, status, due_date')
      .order('due_date', { ascending: true, nullsFirst: false }),
  ])

  const err =
    projectsRes.error || clientsRes.error || tasksRes.error
      ? [
          projectsRes.error?.message,
          clientsRes.error?.message,
          tasksRes.error?.message,
        ]
          .filter(Boolean)
          .join(' ')
      : null

  if (err) {
    return {
      error: err,
      projects: [],
      clientsWithBudget: [],
      tasks: [],
      summary: emptySummary(),
    }
  }

  const projectRows = projectsRes.data ?? []
  const clientRows = clientsRes.data ?? []
  const taskRows = tasksRes.data ?? []

  const clientById = Object.fromEntries(
    clientRows.map((c) => [c.client_id, c.company_name]),
  )
  const projectById = Object.fromEntries(
    projectRows.map((p) => [p.project_id, p.project_name]),
  )

  const budgetByClient = {}
  for (const p of projectRows) {
    const cid = p.client_id
    if (cid == null) continue
    const b = Number(p.budget) || 0
    budgetByClient[cid] = (budgetByClient[cid] ?? 0) + b
  }

  const clientsBudget = clientRows.map((c) => ({
    client_id: c.client_id,
    company_name: c.company_name,
    total_project_budget: budgetByClient[c.client_id] ?? 0,
    total_project_budget_display: formatCurrency(budgetByClient[c.client_id] ?? 0),
  }))

  const projects = projectRows.map((p) => ({
    ...p,
    budget_display: formatCurrency(p.budget),
  }))

  const tasks = taskRows.map((t) => ({
    ...t,
    due_date_display: formatDate(t.due_date),
  }))

  return {
    error: null,
    projects,
    clientsWithBudget: clientsBudget,
    tasks,
  }
}

export function useCrmData() {
  const [projects, setProjects] = useState([])
  const [clientsWithBudget, setClientsWithBudget] = useState([])
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const runFetch = useCallback(async () => {
    setLoading(true)
    setError(null)
    const result = await fetchCrmData()
    setLoading(false)
    setError(result.error)
    setProjects(result.projects)
    setClientsWithBudget(result.clientsWithBudget)
    setTasks(result.tasks)
  }, [])

  useEffect(() => {
    co