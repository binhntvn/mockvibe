# Deployment Guide: SoleMate E-Commerce

## 1. Introduction
This document provides a guide for deploying the SoleMate e-commerce application to a production environment.

## 2. Deployment Checklist

### 2.1 Pre-Deployment
- [ ] All code has been reviewed and merged into the `main` branch.
- [ ] All unit and system tests have passed.
- [ ] Environment variables for production have been configured and are ready.
- [ ] The database has been backed up.

### 2.2 Deployment
- [ ] Deploy the FastAPI backend to the chosen hosting provider.
- [ ] Deploy the React frontend to Vercel or Netlify.
- [ ] Configure the frontend to point to the live backend URL.

### 2.3 Post-Deployment
- [ ] Perform a smoke test on the live application to ensure all critical features are working.
- [ ] Monitor the application for any errors or performance issues.

## 3. Live URL
- **Frontend**: `https://solemate.vercel.app` (Placeholder)
- **Backend**: `https://solemate-api.herokuapp.com` (Placeholder)

## 4. Rollback Plan
In the event of a critical issue in production, the following rollback plan should be executed:

1.  **Revert the frontend**: Vercel and Netlify provide an easy way to instantly roll back to a previous deployment.
2.  **Revert the backend**: Re-deploy the previous stable version of the backend application.
3.  **Restore the database**: If the issue is related to data corruption, restore the database from the pre-deployment backup.