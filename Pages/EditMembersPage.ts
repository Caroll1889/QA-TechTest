import { Page, Locator, expect } from "@playwright/test";
import { faker } from "@faker-js/faker/locale/en_US";
import  AddMembersPage  from "./AddMembers";

export default class EditMembers {
  readonly page: Page;
  readonly editButton: Locator;
  readonly editMemberParagraph: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly saveChangesButton: Locator;
  readonly addMembersPage: AddMembersPage;

  constructor(page: Page) {
    this.page = page;
  }

  async editMembers() {
    const addMembersPage = new AddMembersPage(this.page);
    const fakeEmail = faker.internet.email();
    const fakeName = faker.person.firstName();
    const fakeNewName = faker.person.firstName();
    const fakeLastName = faker.person.lastName()
    
    await addMembersPage.addMembers(fakeEmail, fakeName, fakeLastName);
      
    const newPage = this.page.context().pages().at(-1)!;
    const editButton = newPage.getByTestId('test-icon-edit');
    const editMemberParagraph = newPage.getByText("Edit Household Member", {
      exact: true,
    });
    const firstNameInput = newPage.getByRole("textbox", {name: "First Name"});
    const lastNameInput = newPage.getByRole("textbox", { name: "Last Name" });
    const saveChangesButton = newPage.getByRole("button", {name: "Save Changes"});
  
    const total = await editButton.count();
    await editButton.nth(total - 1).click();
    await expect(editMemberParagraph).toBeVisible();
    await firstNameInput.fill(fakeNewName);
    await lastNameInput.fill(fakeLastName);
    await saveChangesButton.click();
    await expect(newPage.getByText(`${fakeNewName} ${fakeLastName}`)).toBeVisible()
  }
}
