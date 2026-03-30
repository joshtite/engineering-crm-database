-- Total budget per client
select c.company_name, sum(p.budget) as total_budget
from projects p
join clients c on p.client_id = c.client_id
group by c.company_name;

-- 3. Average project budget
select round(avg(budget), 2) as average_project_budget
from projects;

-- Projects per client
select c.company_name, count(p.project_id) as total_projects
from clients c
left join projects p on c.client_id = p.client_id
group by c.company_name;

-- 4. Projects currently in progress
select p.project_name, c.company_name, p.start_date, p.end_date, p.budget
from projects p
join clients c on p.client_id = c.client_id
where p.status = 'in_progress'
order by p.end_date;

-- Outstanding tasks
select t.title, t.status, t.priority, t.due_date, p.project_name
from tasks t
join projects p on t.project_id = p.project_id
where t.status <> 'completed';


-- 11. Clients with no active projects
select c.company_name
from clients c
left join projects p
  on c.client_id = p.client_id
  and p.status = 'in_progress'
where p.project_id is null;
