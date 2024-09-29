import mongoose from "mongoose";
import {
    ProjectTypes
} from "@illustry/types";
import { create } from 'apisauce';
import Illustry from "../../src/app";
import Factory from "../../src/factory";

process.env.NODE_ENV = "test";
process.env.MONGO_TEST_URL = "mongodb://localhost:27017/illustrytest";
process.env.MONGO_USER = "root"
process.env.MONGO_PASSWORD = "rootPass"
process.env.ILLUSTRY_PORT = '7050'
const illustry = new Illustry()

const api = create({
    baseURL: 'http://localhost:7050',
    headers: {
        'Content-Type': 'application/json',
    },
});

const factory = Factory.getInstance();

describe("project API", () => {
    beforeAll(async () => {
        await illustry.start();
    })
    afterAll(async () => {
        delete process.env.NODE_ENV;
        const allProjects = await factory.getBZL().ProjectBZL.browse({});

        const deletePromises = (allProjects.projects || []).map(async (project) => {
            await factory.getBZL().ProjectBZL.delete({ name: project.name });
        });

        await Promise.all(deletePromises);
        await mongoose.disconnect();
        await illustry.stop();

    });

    it("create a project ", async () => {
        const expectedProject = {
            projectName: "Test_Project1",
            projectDescription: "Test_ProjectDescription1",
            isActive: false
        };
        const response = await api.post('/api/project', expectedProject);
        const responseData = response.data as ProjectTypes.ProjectCreate;
        expect(response.ok).toBe(true)
        expect(response.status).toBe(200)
        expect(responseData.createdAt).toBeDefined();
        expect(responseData.updatedAt).toBeDefined();
        expect(responseData.isActive).toBe(false);
        const mongoProject = await factory.getBZL().ProjectBZL.findOne({ name: 'Test_Project1' })
        expect(mongoProject).not.toBeNull()
    });

    it("creates the same project twice", async () => {

        const expectedProject = {
            projectName: "Test_Project2",
            projectDescription: "Test_ProjectDescription2",
            isActive: true,
        };
        const response = await api.post('/api/project', expectedProject);
        const responseData = response.data as ProjectTypes.ProjectCreate;
        const mongoProject = await factory.getBZL().ProjectBZL.findOne({ name: 'Test_Project2' })
        expect(mongoProject).not.toBeNull()
        expect(response.ok).toBe(true)
        expect(response.status).toBe(200)
        expect(responseData.createdAt).toBeDefined();
        expect(responseData.updatedAt).toBeDefined();
        expect(responseData.isActive).toBe(true);

        const response1 = await api.post('/api/project', expectedProject);
        expect(response1.ok).toBe(false)
        expect(response1.data).toContain("There already is a project named Test_Project2")

    });

    it("update a project with is active true", async () => {

        const expectedProject: ProjectTypes.ProjectUpdate = {
            name: 'Test_Project1',
            description: "Test_ProjectDescription1_1",
            isActive: true,
        };
        const response = await api.put('/api/project', expectedProject);
        const mongoProject = await factory.getBZL().ProjectBZL.findOne({ name: 'Test_Project1' })
        const responseData = response.data as ProjectTypes.ProjectCreate;
        expect(mongoProject).not.toBeNull()
        expect(response.ok).toBe(true)
        expect(response.status).toBe(200)
        expect(responseData.createdAt).toBeDefined();
        expect(responseData.updatedAt).toBeDefined();
        expect(responseData.isActive).toBe(true);
        expect(mongoProject).not.toBeNull()
        expect(response.ok).toBe(true)
        expect(response.status).toBe(200)
        expect(responseData.createdAt).toBeDefined();
        expect(responseData.updatedAt).toBeDefined();
        expect(responseData.isActive).toBe(true);
    });

    it("update a project with is active false", async () => {
        const expectedProject: ProjectTypes.ProjectUpdate = {
            name: "Test_Project2",
            description: "Test_ProjectDescription2",
            isActive: false,
        };
        const response = await api.put('/api/project', expectedProject);
        const mongoProject = await factory.getBZL().ProjectBZL.findOne({ name: 'Test_Project2' })
        const responseData = response.data as ProjectTypes.ProjectCreate;
        expect(mongoProject).not.toBeNull()
        expect(response.ok).toBe(true)
        expect(response.status).toBe(200)
        expect(responseData.createdAt).toBeDefined();
        expect(responseData.updatedAt).toBeDefined();
        expect(responseData.isActive).toBe(false);
        expect(mongoProject).not.toBeNull()
        expect(response.ok).toBe(true)
        expect(response.status).toBe(200)
        expect(responseData.createdAt).toBeDefined();
        expect(responseData.updatedAt).toBeDefined();
        expect(responseData.isActive).toBe(false);
    });

    it("finds a project by name", async () => {
        const expectedProject: ProjectTypes.ProjectCreate = {
            name: "Test_Project2",
            description: "Test_ProjectDescription2",
        };
        const response = await api.post('/api/project/Test_Project2');
        const responseData = response.data as ProjectTypes.ProjectCreate;
        expect(response.ok).toBe(true)
        expect(response.status).toBe(200)
        expect(responseData.createdAt).toBeDefined();
        expect(responseData.updatedAt).toBeDefined();
        expect(responseData.isActive).toBe(false);
        expect(responseData).toMatchObject(expectedProject);
    });

    it("browse projects by all filter", async () => {

        const expectedProject1: ProjectTypes.ProjectCreate = {
            name: "Test_Project1",
            description: "Test_ProjectDescription1_1",
        };
        const expectedProject2: ProjectTypes.ProjectCreate = {
            name: "Test_Project2",
            description: "Test_ProjectDescription2",
        };

        const response1 = await api.post('/api/projects', { name: "Test_Project2" });
        const responseData1: any = response1.data;
        expect(response1.ok).toBe(true)
        expect(response1.status).toBe(200)


        expect(responseData1.projects).toBeDefined();
        if (responseData1.projects && responseData1.projects.length > 0) {
            expect((responseData1.projects[0] as ProjectTypes.ProjectType)).toMatchObject(expectedProject2);
        }

        const response2 = await api.post('/api/projects', { text: "2" });
        const responseData2: any = response2.data;
        expect(response2.ok).toBe(true)
        expect(response2.status).toBe(200)


        expect(responseData2.projects).toBeDefined();
        if (responseData2.projects && responseData2.projects.length > 0) {
            expect((responseData2.projects[0] as ProjectTypes.ProjectType)).toMatchObject(expectedProject2);
        }

        const response3 = await api.post('/api/projects', { text: "3" });
        const responseData3: any = response3.data;
        expect(response3.ok).toBe(true)
        expect(response3.status).toBe(200)


        expect(responseData3.projects).toBeDefined();
        if (responseData3.projects && responseData3.projects.length === 0) {
            expect((responseData3.projects as ProjectTypes.ProjectType[]).length).toBe(0);
        }

        const response4 = await api.post('/api/projects', {
            sort: {
                element: "name",
                sortOrder: -1,
            },
        });
        const responseData4: any = response4.data;
        expect(response4.ok).toBe(true)
        expect(response4.status).toBe(200)


        expect(responseData4.projects).toBeDefined();
        if (responseData4.projects && responseData2.projects.length > 0) {
            expect((responseData4.projects[0] as ProjectTypes.ProjectType)).toMatchObject(expectedProject2);
        }

        const response5 = await api.post('/api/projects', {
            isActive: true,
        });
        const responseData5: any = response5.data;
        expect(response5.ok).toBe(true)
        expect(response5.status).toBe(200)


        expect(responseData5.projects).toBeDefined();
        if (responseData5.projects && responseData5.projects.length > 0) {
            expect((responseData5.projects[0] as ProjectTypes.ProjectType)).toMatchObject(expectedProject1);
        }

    });

    it("deletes a project", async () => {
        const response = await api.delete('/api/project', { name: "Test_Project2" });
        const responseData: any = response.data;
        expect(response.ok).toBe(true)
        expect(response.status).toBe(200)
        expect(responseData).toBe(true)
    })
});
