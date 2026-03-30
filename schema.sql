-- CLIENTS
create table clients (
  client_id bigint generated always as identity primary key,
  company_name varchar not null,
  industry varchar,
  email varchar,
  phone varchar,
  address text,
  status varchar default 'active'
);

-- USERS (employees at FPP Consulting)
create table users (
  user_id bigint generated always as identity primary key,
  name varchar not null,
  email varchar unique,
  role varchar,
  created_at timestamp default current_timestamp
);

-- PROJECTS
create table projects (
  project_id bigint generated always as identity primary key,
  client_id bigint references clients(client_id) on delete cascade,
  project_name varchar not null,
  description text,
  status varchar,
  budget numeric,
  start_date date,
  end_date date
);

-- CONTACTS (people at client companies)
create table contacts (
  contact_id bigint generated always as identity primary key,
  client_id bigint references clients(client_id) on delete cascade,
  name varchar not null,
  email varchar,
  phone varchar,
  position varchar
);

-- TASKS
create table tasks (
  task_id bigint generated always as identity primary key,
  project_id bigint references projects(project_id) on delete cascade,
  assigned_user_id bigint references users(user_id),
  title varchar not null,
  description text,
  due_date date,
  status varchar,
  priority varchar
);

-- PROJECT UPDATES
create table project_updates (
  update_id bigint generated always as identity primary key,
  project_id bigint references projects(project_id) on delete cascade,
  update_type varchar,
  notes text,
  update_date timestamp default current_timestamp
);
