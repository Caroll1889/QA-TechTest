import { Page, Locator, expect } from "@playwright/test";


export default class AddembersPage {
  readonly page: Page;
  readonly householdName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.householdName = page.getByRole("gridcell", {
      name: "Legal New Name LastName",
    });
  }

  async addMembers(email: string, firstName: string, lastName: string) {
    const [newPage] = await Promise.all([
      this.page.waitForEvent("popup"),
      this.householdName.click(),
    ]);
    const householdTab: Locator = newPage.getByRole("link", {
      name: "Household",
    });
    const addMemberButton: Locator = newPage.getByRole("button", {
      name: "Add Member button icon",
    });
    const addMemberButtonText: Locator = newPage
      .locator("#member-info-modal-parent")
      .getByRole("button", { name: "Add Member button icon" });
    const addMemberParagraph: Locator = newPage.getByText(
      "Add Household Member",
      { exact: true }
    );
    

    await expect(
      newPage.getByRole("heading", { name: "Legal New Name LastName" })
    ).toBeVisible();
    await householdTab.click();
    await expect(
      newPage.getByRole("heading", { name: "LastName's Household Members" })
    ).toBeVisible();
    await addMemberButton.click();
    await expect(addMemberParagraph).toBeVisible();

    await newPage.getByRole("textbox", { name: "Email" }).fill(email);
    await newPage.getByRole("textbox", { name: "First Name" }).fill(firstName);
    await newPage
      .getByRole("textbox", { name: "Last Name" })
      .fill(lastName);
    await newPage
      .getByRole("textbox", { name: "Phone number" })
      .fill("3103333333");
    await addMemberButtonText.click();
    await expect(newPage.getByText('Member added!')).toBeVisible()
    await expect(newPage.getByText(`${firstName} ${lastName}`)).toBeVisible()
  }
}
