import './App.css'
import { useCrmData } from './hooks/useCrmData'

function App() {
  const { projects, clientsWithBudget, tasks, summary, loading, error, reload } =
    useCrmData()

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>FPP Consulting — CRM overview</h1>
          <p className="tagline">
            Live data: clients, projects, and tasks (engineering consultancy demo)
          </p>
        </div>
        <button type="button" className="reload" onClick={reload} disabled={loading}>
          {loading ? 'Loading…' : 'Refresh'}
        </button>
      </header>

      {error && (
        <div className="banner error" role="alert">
          {error}
        </div>
      )}

      <section className="snapshot" aria-label="Summary">
        <div className="stat">
          <span className="stat-value">{summary.projectCount}</span>
          <span className="stat-label">Projects</span>
        </div>
        <div className="stat">
          <span className="stat-value">{summary.clientCount}</span>
          <span className="stat-label">Clients</span>
        </div>
        <div className="stat">
          <span className="stat-value">{summary.taskCount}</span>
          <span className="stat-label">Tasks</span>
        </div>
        <div className="stat">
          <span className="stat-value">{summary.inProgressProjects}</span>
          <span className="stat-label">In progress</span>
        </div>
        <div className="stat">
          <span className="stat-value">{summary.openTasks}</span>
          <span className="stat-label">Open tasks</span>
        </div>
        <div className="stat wide">
          <span className="stat-value">{summary.totalBudgetDisplay}</span>
          <span className="stat-label">Pipeline (sum of project budgets)</span>
        </div>
        <div className="stat wide">
          <span className="stat-value">{summary.avgBudgetDisplay}</span>
          <span className="stat-label">Avg project budget</span>
        </div>
      </section>

      <section className="panel">
        <h2>Projects</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Client</th>
                <th>Status</th>
                <th>Budget</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 && !loading ? (
                <tr>
                  <td colSpan={4} className="empty">
                    No projects
                  </td>
                </tr>
              ) : (
                projects.map((p) => (
                  <tr key={p.project_id}>
                    <td>{p.project_name}</td>
                    <td>{p.client_name}</td>
                    <td>{p.status ?? '—'}</td>
                    <td>{p.budget_display}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <h2>Clients (total project budget)</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Total budget</th>
              </tr>
            </thead>
            <tbody>
              {clientsWithBudget.length === 0 && !loading ? (
                <tr>
                  <td colSpan={2} className="empty">
                    No clients
                  </td>
                </tr>
              ) : (
                clientsWithBudget.map((c) => (
                  <tr key={c.client_id}>
                    <td>{c.company_name}</td>
                    <td>{c.total_project_budget_display}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="panel">
        <h2>Tasks</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Project</th>
                <th>Status</th>
                <th>Due date</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 && !loading ? (
                <tr>
                  <td colSpan={4} className="empty">
                    No tasks
                  </td>
                </tr>
              ) : (
                tasks.map((t) => (
                  <tr key={t.task_id}>
                    <td>{t.title}</td>
                    <td>{t.project_name}</td>
                    <td>{t.status ?? '—'}</td>
                    <td>{t.due_date_display}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="footer">
        <p>
          Backend: PostgreSQL on Supabase · Schema includes contacts, internal users, and
          project updates (not shown here yet).
        </p>
      </footer>
    </div>
  )
}

export default App
