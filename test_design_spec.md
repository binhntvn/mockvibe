# Test Design Specification - System Test

## 1. Introduction
This document outlines the test design for the system-level testing of the SoleMate e-commerce application.

### 1.1 Scope
This test plan covers the end-to-end functionality of the application, simulating real-world user scenarios.

### 1.2 Test Objectives
- Verify that all functional requirements are met.
- Ensure the application is secure, responsive, and user-friendly.
- Validate the integration between the frontend, backend, and database.

## 2. Test Strategy
- **Testing Level**: System Test
- **Testing Types**: Functional, Usability, Security, and Performance Testing.
- **Test Environment**: A staging environment that mirrors the production setup.

## 3. Test Cases

### 3.1 User Authentication
| Test Case ID | Test Case Description | Expected Result |
| :--- | :--- | :--- |
| TC-AUTH-01 | Register a new user with valid credentials. | User is created and logged in. |
| TC-AUTH-02 | Attempt to register with an existing email. | Error message is displayed. |
| TC-AUTH-03 | Log in with a valid, registered user. | User is logged in and redirected. |
| TC-AUTH-04 | Attempt to log in with an invalid password. | Error message is displayed. |

### 3.2 Product & Cart
| Test Case ID | Test Case Description | Expected Result |
| :--- | :--- | :--- |
| TC-PROD-01 | View the product grid on the home page. | All products are displayed correctly. |
| TC-PROD-02 | Click on a product to view its details. | The product detail page is displayed. |
| TC-CART-01 | Add a product to the cart from the grid. | The cart is updated with the new item. |
| TC-CART-02 | Adjust the quantity of an item in the cart. | The cart total is updated. |

### 3.3 Checkout & Orders
| Test Case ID | Test Case Description | Expected Result |
| :--- | :--- | :--- |
| TC-CHECK-01 | Proceed to checkout with items in the cart. | The checkout page is displayed. |
| TC-ORDER-01 | Complete the checkout process. | An order is created and visible in the user's profile. |

### 3.4 Admin Panel
| Test Case ID | Test Case Description | Expected Result |
| :--- | :--- | :--- |
| TC-ADMIN-01 | Access the admin panel as a non-admin user. | Access is denied. |
| TC-ADMIN-02 | View the list of users and orders. | All users and orders are displayed. |