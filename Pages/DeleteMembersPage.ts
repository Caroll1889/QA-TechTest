import { Page, Locator, expect } from "@playwright/test";
import { faker } from "@faker-js/faker/locale/en_US";
import AddMembersPage from "./AddMembers";

export default class EditMembers {
  readonly page: Page;
  readonly deleteButton: Locator;
  readonly removeButton: Locator;
  readonly addMembersPage: AddMembersPage;

  constructor(page: Page) {
    this.page = page;
  }

  async deleteMembers() {
    const addMembersPage = new AddMembersPage(this.page);
    const fakeEmail = faker.internet.email();
    const fakeName = faker.person.firstName();
    const fakeLastName = faker.person.lastName();

    await addMembersPage.addMembers(fakeEmail, fakeName, fakeLastName);

    const newPage = this.page.context().pages().at(-1)!;
    const deleteButton = newPage.locator('i.fa-trash');
    const deleteMemberParagraph = newPage.getByText(`Are you sure you want to remove “${fakeName} ${fakeLastName}” from your household`, {
      exact: true,
    });
    const removeButton = newPage.getByRole("button", {name: "Remove"})
    const total = await deleteButton.count();
    await deleteButton.nth(total - 1).click();
    await expect(deleteMemberParagraph).toBeVisible();
    await removeButton.click();
    await expect(newPage.getByText(`${fakeName} ${fakeLastName}`, { exact: true })).not.toBeVisible();

  }
}
