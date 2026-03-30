# Engineering CRM & Project Management Database

## Overview
This project is a relational CRM and project management database designed for an engineering consultancy (e.g. FPP Consulting).

It allows the company to manage client relationships, track projects, assign tasks, and generate management reports for business insights.

---

## Features

- Client management (companies FPP works with)
- Project tracking (status, budgets, timelines)
- Task management and assignment
- Project updates logging
- Contact management for client companies
- SQL reporting for management insights

---

## Database Structure

The system is built using a relational database with the following core tables:

- **clients** – stores client company information  
- **projects** – tracks projects linked to clients  
- **tasks** – tracks work assigned to users within projects  
- **users** – internal employees of the consultancy  
- **contacts** – client-side contacts  
- **project_updates** – logs project progress and updates  

Relationships:
- A client can have many projects  
- A project can have many tasks  
- Tasks are assigned to users  
- Projects have updates and client contacts  

---

## Example Queries (Reporting)

The database includes SQL queries used for business reporting:

- Total project budget per client  
- Number of projects per client  
- Projects grouped by status  
- Outstanding and overdue tasks  
- Task distribution by priority  
- Workload per user  
- Latest project updates  

---

## Technologies

- PostgreSQL (Supabase)
- SQL

---

## Purpose

This project simulates a real internal system used by an engineering consultancy to manage operations and support decision-making.

It demonstrates:
- relational database design  
- use of foreign keys and relationships  
- real-world business reporting queries  

---

## Future Improvements

- Build a frontend dashboard (React) to visualise data  
- Add authentication and user roles  
- Expand reporting with analytics and KPIs  

---
