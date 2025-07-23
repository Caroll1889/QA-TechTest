import { test, expect } from "@playwright/test";
import data from "../data/users.json";
import Loginpage from "../Pages/LoginPage";
import AddembersPage from "../Pages/AddMembers";


test.describe("Login Tests", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new Loginpage(page);

    await page.goto("https://dashboard-test.zoefin.com/login");
    await expect(page.getByTitle("Zoe Financial")).toBeVisible();

    await loginPage.newLogin(
      data.users.zoefin.email,
      data.users.zoefin.password
    );
  });

  test("Login as Advisor", async ({ page }) => {
    await expect(page).toHaveURL(
      "https://dashboard-test.zoefin.com/dashboard/pipeline"
    );
    await expect(page.getByRole("heading", { name: "Pipeline" })).toBeVisible();
  });

  test("add new members", async ({ page }) => {
    const addMembersPage = new AddembersPage(page);

    await expect(page).toHaveURL(
      "https://dashboard-test.zoefin.com/dashboard/pipeline"
    );
    await expect(page.getByRole("heading", { name: "Pipeline" })).toBeVisible();

    await addMembersPage.addMembers();
  });
});
