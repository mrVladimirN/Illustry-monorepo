import _ from "lodash";
import { Factory } from "../../src/factory";
import mongoose from "mongoose";
import {
  ProjectCreate,
  ProjectUpdate,
  ProjectType,
  ExtendedProjectType,
} from "types/project";

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
    expect.assertions(5);

    const expectedProject: ProjectCreate = {
      name: "Test_Project1",
      description: "Test_ProjectDescription1",
    };
    const project: ProjectType = await factory
      .getBZL()
      .ProjectBZL.create(expectedProject);
    expect(!_.isNil(project)).toBe(true);
    expect(!_.isNil(project.createdAt)).toBe(true);
    expect(!_.isNil(project.updatedAt)).toBe(true);
    expect(project.isActive).toBe(false);
    expect(_.isMatch(project, expectedProject)).toBe(true);
  });
  it("creates the same project twice", async () => {
    expect.assertions(7);

    const expectedProject: ProjectCreate = {
      name: "Test_Project2",
      description: "Test_ProjectDescription2",
      isActive: true,
    };
    const project: ProjectType = await factory
      .getBZL()
      .ProjectBZL.create(expectedProject);
    expect(!_.isNil(project)).toBe(true);
    expect(!_.isNil(project.createdAt)).toBe(true);
    expect(!_.isNil(project.updatedAt)).toBe(true);
    expect(project.isActive).toBe(true);
    expect(_.isMatch(project, expectedProject)).toBe(true);
    try {
      await factory.getBZL().ProjectBZL.create(expectedProject);
    } catch (error) {
      expect(error).toBeDefined();
      const castedError = error as Error;
      expect(castedError.message).toContain(
        "There already is a project named Test_Project2"
      );
    }
  });
  it("update a project with is active true", async () => {
    expect.assertions(5);

    const expectedProject: ProjectUpdate = {
      description: "Test_ProjectDescription1_1",
      isActive: true,
    };
    const project: ProjectType = await factory
      .getBZL()
      .ProjectBZL.update({ name: "Test_Project1" }, expectedProject);
    expect(!_.isNil(project)).toBe(true);
    expect(!_.isNil(project.createdAt)).toBe(true);
    expect(!_.isNil(project.updatedAt)).toBe(true);
    expect(project.isActive).toBe(true);
    expect(_.isMatch(project, expectedProject)).toBe(true);
  });
  it("update a project with is active false", async () => {
    expect.assertions(5);

    const expectedProject: ProjectUpdate = {
      description: "Test_ProjectDescription2",
      isActive: false,
    };
    const project: ProjectType = await factory
      .getBZL()
      .ProjectBZL.update({ name: "Test_Project2" }, expectedProject);
    expect(!_.isNil(project)).toBe(true);
    expect(!_.isNil(project.createdAt)).toBe(true);
    expect(!_.isNil(project.updatedAt)).toBe(true);
    expect(project.isActive).toBe(false);
    expect(_.isMatch(project, expectedProject)).toBe(true);
  });
  it("update a non existing project", async () => {
    expect.assertions(2);

    const expectedProject: ProjectUpdate = {
      description: "Test_ProjectDescription1_1",
      isActive: false,
    };
    try {
      await factory
        .getBZL()
        .ProjectBZL.update({ name: "Fake_Name" }, expectedProject);
    } catch (error) {
      expect(error).toBeDefined();
      const castedError = error as Error;
      expect(castedError.message).toContain(
        "No data was found with name Fake_Name"
      );
    }
  });
  it("finds a project by name", async () => {
    expect.assertions(5);

    const expectedProject: ProjectCreate = {
      name: "Test_Project2",
      description: "Test_ProjectDescription2",
    };
    const project: ProjectType = await factory
      .getBZL()
      .ProjectBZL.findByName({ name: "Test_Project2" });
    expect(!_.isNil(project)).toBe(true);
    expect(!_.isNil(project.createdAt)).toBe(true);
    expect(!_.isNil(project.updatedAt)).toBe(true);
    expect(project.isActive).toBe(false);
    expect(_.isMatch(project, expectedProject)).toBe(true);
  });
  
  it("browse projects by all filter", async () => {
    expect.assertions(10);

    const expectedProject1: ProjectCreate = {
      name: "Test_Project1",
      description: "Test_ProjectDescription1_1",
    };
    const expectedProject2: ProjectCreate = {
      name: "Test_Project2",
      description: "Test_ProjectDescription2",
    };
    const projects1: ExtendedProjectType = await factory
      .getBZL()
      .ProjectBZL.browse({ name: "Test_Project2" });
    expect(!_.isNil(projects1)).toBe(true);
    expect(
      _.isMatch((projects1.projects as ProjectType[])[0], expectedProject2)
    ).toBe(true);

    const projects2: ExtendedProjectType = await factory
      .getBZL()
      .ProjectBZL.browse({ text: "2" });
    expect(!_.isNil(projects2)).toBe(true);
    expect(
      _.isMatch((projects2.projects as ProjectType[])[0], expectedProject2)
    ).toBe(true);

    const projects3: ExtendedProjectType = await factory
      .getBZL()
      .ProjectBZL.browse({ text: "3" });
    expect(!_.isNil(projects3)).toBe(true);
    expect(_.isMatch((projects3.projects as ProjectType[])[0], [])).toBe(true);

    const projects4: ExtendedProjectType = await factory
      .getBZL()
      .ProjectBZL.browse({
        sort: {
          element: "name",
          sortOrder: -1,
        },
      });
    expect(!_.isNil(projects4)).toBe(true);
    expect(
      _.isMatch((projects4.projects as ProjectType[])[0], expectedProject2)
    ).toBe(true);
    const projects5: ExtendedProjectType = await factory
      .getBZL()
      .ProjectBZL.browse({
        isActive: true,
      });
    expect(!_.isNil(projects5)).toBe(true);
    expect(
      _.isMatch((projects5.projects as ProjectType[])[0], expectedProject1)
    ).toBe(true);
  });
  it("deletes a project", async () => {
    expect.assertions(2);
    const project: boolean = await factory
      .getBZL()
      .ProjectBZL.delete({ name: "Test_Project2" });
    expect(!_.isNil(project)).toBe(true);
    expect(project).toBe(true);
  });
});
