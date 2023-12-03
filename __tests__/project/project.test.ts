import _ from "lodash";
import { Factory } from "../../src/factory";
import mongoose from "mongoose";

process.env.NODE_ENV = "test";

const factory = Factory.getInstance();

describe("project CRUD", () => {
  afterAll(async () => {
    delete process.env.NODE_ENV;
    const allProjects = await factory.getBZL().ProjectBZL.browse({});

    // Use map to create an array of promises
    const deletePromises = (allProjects.projects || []).map(async (project) => {
      await factory.getBZL().ProjectBZL.delete({ name: project.name });
    });

    // Wait for all promises to complete before disconnecting
    await Promise.all(deletePromises);
    await mongoose.disconnect();
  });

  it("create a project", async () => {
    expect.assertions(4);

    const expectedProject = {
      name: "Test_Project1",
      description: "Test_ProjectDescription1",
    };

    const project = await factory.getBZL().ProjectBZL.create(expectedProject);

    expect(!_.isNil(project)).toBe(true);
    expect(!_.isNil(project.createdAt)).toBe(true);
    expect(!_.isNil(project.updatedAt)).toBe(true);
    expect(project.isActive).toBe(false);
  });
});
