import './App.css'
import { useCrmData } from './hooks/useCrmData'

function App() {
  const { projects, clientsWithBudget, tasks, loading, error, reload } =
    useCrmData()

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Engineering CRM</h1>
        <button type="button" className="reload" onClick={reload} disabled={loading}>
          {loading ? 'Loading…' : 'Refresh'}
        </button>
      </header>

      {error && (
        <div className="banner error" role="alert">
          {error}
        </div>
      )}

      <section className="panel">
        <h2>Projects</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Status</th>
                <th>Budget</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 && !loading ? (
                <tr>
                  <td colSpan={3} className="empty">
                    No projects
                  </td>
                </tr>
              ) : (
                projects.map((p) => (
                  <tr key={p.project_id}>
                    <td>{p.project_name}</td>
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
                <th>Status</th>
                <th>Due date</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 && !loading ? (
                <tr>
                  <td colSpan={3} className="empty">
                    No tasks
                  </td>
                </tr>
              ) : (
                tasks.map((t) => (
                  <tr key={t.task_id}>
                    <td>{t.title}</td>
                    <td>{t.status ?? '—'}</td>
                    <td>{t.due_date_display}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

export default App
