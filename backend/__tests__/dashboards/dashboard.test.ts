import mongoose from "mongoose";
import {
    DashboardTypes,
    FileTypes,
    ProjectTypes,
    VisualizationTypes
} from "@illustry/types";
import Factory from "../../src/factory";
import path from "path";
import * as fs from 'fs';
process.env.NODE_ENV = "test";
process.env.MONGO_TEST_URL = "mongodb://localhost:27017/illustrytest";
process.env.MONGO_USER = "root"
process.env.MONGO_PASSWORD = "rootPass"

const factory = Factory.getInstance();

describe("dashboard CRUD", () => {
    beforeAll(async () => {
        const expectedProject: ProjectTypes.ProjectCreate = {
            name: "Test_Project_Dashboard",
            description: "Test_ProjectDescription1",
            isActive: true,
        };
        await factory.getBZL().ProjectBZL.create(expectedProject);
    });
    afterAll(async () => {
        delete process.env.NODE_ENV;
        const allProjects = await factory.getBZL().ProjectBZL.browse({});

        const deletePromises = (allProjects.projects || []).map(async (project) => {
            await factory.getBZL().ProjectBZL.delete({ name: project.name });
        });

        await Promise.all(deletePromises);
        await mongoose.disconnect();
    });

    it("create a dashboard", async () => {

        const expectedDashboard: DashboardTypes.DashboardCreate = {
            name: "Test_dashboard1",
            description: "Test_dashboardDescription1",
            projectName: 'Test_Project_Dashboard'
        };
        const dashboard: DashboardTypes.DashboardType = await factory
            .getBZL()
            .DashboardBZL.create(expectedDashboard);
        expect(dashboard).not.toBeNull();
        if (dashboard) {
            expect(dashboard.createdAt).toBeDefined();
            expect(dashboard.updatedAt).toBeDefined();
            expect(dashboard).toMatchObject(expectedDashboard);
        }
    });

    it("creates the same dashboard twice", async () => {

        const expectedDashboard: DashboardTypes.DashboardCreate = {
            name: "Test_dashboard2",
            description: "Test_dashboardDescription2",
            projectName: 'Test_Project_Dashboard'
        };
        const dashboard: DashboardTypes.DashboardType = await factory
            .getBZL()
            .DashboardBZL.create(expectedDashboard);


        expect(dashboard).not.toBeNull();
        if (dashboard) {
            expect(dashboard.createdAt).toBeDefined();
            expect(dashboard.updatedAt).toBeDefined();
            expect(dashboard).toMatchObject(expectedDashboard);
        }

        try {
            await factory.getBZL().DashboardBZL.create(expectedDashboard);
        } catch (error) {
            expect(error).toBeDefined();
            const castedError = error as Error;
            expect(castedError.message).toContain(
                "There already is a Dashboard named Test_dashboard2"
            );
        }
    });


    it("update a non existing dashboard", async () => {

        const expectedDashboard: DashboardTypes.DashboardUpdate = {
            description: "Test_dashboardDescription1_1",
            projectName: 'Test_Project_Dashboard'
        };
        try {
            await factory
                .getBZL()
                .DashboardBZL.update({ name: "Fake_Name" }, expectedDashboard);
        } catch (error) {
            expect(error).toBeDefined();
            const castedError = error as Error;
            expect(castedError.message).toContain(
                "No dashboard was found with name Fake_Name"
            );
        }
    });

    it("finds a dashboard by name", async () => {

        const expectedDashboard: DashboardTypes.DashboardCreate = {
            name: "Test_dashboard2",
            description: "Test_dashboardDescription2",
            projectName: 'Test_Project_Dashboard'
        };
        const dashboard: DashboardTypes.DashboardType = await factory
            .getBZL()
            .DashboardBZL.findOne({ name: "Test_dashboard2" });

        // Check if dashboard is not null before accessing its properties
        expect(dashboard).not.toBeNull();
        if (dashboard) {
            expect(dashboard.createdAt).toBeDefined();
            expect(dashboard.updatedAt).toBeDefined();
            expect(dashboard).toMatchObject(expectedDashboard);
        }
    });

    it("browse dashboards by all filter", async () => {

        const expectedDashboard1: Omit<DashboardTypes.DashboardCreate, 'projectName'> = {
            name: "Test_dashboard1",
            description: "Test_dashboardDescription1_1",
        };
        const expectedDashboard2: Omit<DashboardTypes.DashboardCreate, 'projectName'> = {
            name: "Test_dashboard2",
            description: "Test_dashboardDescription2",
        };

        const dashboards1: DashboardTypes.ExtendedDashboardType = await factory
            .getBZL()
            .DashboardBZL.browse({ name: "Test_dashboard2" });

        expect(dashboards1.dashboards).toBeDefined();
        if (dashboards1.dashboards && dashboards1.dashboards.length > 0) {
            expect((dashboards1.dashboards[0] as DashboardTypes.DashboardType).name).toBe(expectedDashboard2.name);
        }

        const dashboards2: DashboardTypes.ExtendedDashboardType = await factory
            .getBZL()
            .DashboardBZL.browse({ text: "2" });

        expect(dashboards2.dashboards).toBeDefined();
        if (dashboards2.dashboards && dashboards2.dashboards.length > 0) {
            expect((dashboards2.dashboards[0] as DashboardTypes.DashboardType).name).toBe(expectedDashboard2.name);

        }

        const dashboards3: DashboardTypes.ExtendedDashboardType = await factory
            .getBZL()
            .DashboardBZL.browse({ text: "3" });

        expect(dashboards3.dashboards).toBeDefined();
        if (dashboards3.dashboards && dashboards3.dashboards.length === 0) {
            expect((dashboards3.dashboards as DashboardTypes.DashboardType[]).length).toBe(0);
        }

        const dashboards4: DashboardTypes.ExtendedDashboardType = await factory
            .getBZL()
            .DashboardBZL.browse({
                sort: {
                    element: "name",
                    sortOrder: -1,
                },
            });

        expect(dashboards4.dashboards).toBeDefined();
        if (dashboards4.dashboards && dashboards4.dashboards.length > 0) {
            expect((dashboards4.dashboards[0] as DashboardTypes.DashboardType).name).toBe(expectedDashboard2.name);
        }

        const dashboards5: DashboardTypes.ExtendedDashboardType = await factory
            .getBZL()
            .DashboardBZL.browse({
                isActive: true,
            });

        expect(dashboards5.dashboards).toBeDefined();
        if (dashboards5.dashboards && dashboards5.dashboards.length > 0) {
            expect((dashboards5.dashboards[0] as DashboardTypes.DashboardType).name).toBe(expectedDashboard1.name);
        }
    });
    it("It creates a funnel Visualization JSON with all the details in the JSON and attach it to a dashboard", async () => {
        const funelDetails = path.resolve(
            __dirname,
            "../../__tests_resources__/json/Funnel_FullDetails.json"
        );
        await fs.promises.copyFile(funelDetails, path.resolve(__dirname, 'Funnel_FullDetails.json'));
        const filePath = path.resolve(__dirname, "./Funnel_FullDetails.json");

        const files: FileTypes.FileProperties[] = [{ filePath, type: "application/json" }];
        const allFileDetails: boolean = true;
        const visualizationDetails: VisualizationTypes.VisualizationUpdate = {};
        const fileDetails: FileTypes.FileDetails = { fileType: FileTypes.FileType.JSON };
        const expectedVisualization: VisualizationTypes.VisualizationCreate = {
            projectName: "Test_Project_Dashboard",
            name: "Funnel_FullDetails",
            description: "Funnel_FullDetails description",
            tags: ["full"],
            type: [VisualizationTypes.VisualizationTypesEnum.FUNNEL],
            data: {
                values: {
                    "Statistic 1": 122,
                    "Statistic 2": 222,
                    "Statistic 3": 510,
                    "Statistic 4": 320,
                },
            },
        };
        const visualization: VisualizationTypes.VisualizationType | null = (
            await factory
                .getBZL()
                .VisualizationBZL.createOrUpdateFromFiles(
                    files,
                    allFileDetails,
                    visualizationDetails,
                    fileDetails
                )
        )[0];
        expect(visualization).toMatchObject(expectedVisualization);
        await Factory.getInstance().getBZL().DashboardBZL.update({ name: 'Test_dashboard2' }, { visualizations: { 'Funnel_FullDetails': VisualizationTypes.VisualizationTypesEnum.FUNNEL } })

        const foundDash = await Factory.getInstance().getBZL().DashboardBZL.findOne({ name: 'Test_dashboard2', projectName: 'Test_Project_Dashboard',  })

        expect(foundDash.visualizations?.length).toBe(1);
    });
    it("deletes a dashboard", async () => {
        const dashboard: boolean = await factory
            .getBZL()
            .DashboardBZL.delete({ name: "Test_dashboard2" });
        expect(dashboard).toBe(true);
    });
});
