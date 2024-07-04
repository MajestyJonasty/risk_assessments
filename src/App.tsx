import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home";
import React, { Suspense, lazy } from "react";
import { RootLayout } from "./Root";
import { materialCategoriesLoader } from "./store/loaders/materialLoader";
import { ContextProvider } from "./store/context/ContainerContext";
import DelayedComponent from "./components/layout/UI/PDFDelayedComponent";
import PDFDelayedComponent from "./components/layout/UI/PDFDelayedComponent";
import { ErrorPage } from "./pages/Error";

const RiskAssessmentsPage = lazy(() =>
  import("./pages/RiskAssessments").then((module) => ({
    default: module.RiskAssessments,
  }))
);

const RiskAssessmentsDetailPage = lazy(() =>
  import("./pages/RiskAssessments/details/RiskAssessmentsDetailPage").then(
    (module) => ({
      default: module.RiskAssessmentsDetail,
    })
  )
);

const RiskAssessmentPDFPage = lazy(() =>
  import("./pages/RiskAssessments/pdf/RiskAssementPDFPage").then((module) => ({
    default: module.RiskAssessmentPDFPage,
  }))
);

const MaterialPage = lazy(() =>
  import("./pages/Materials").then((module) => ({
    default: module.MaterialPage,
  }))
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RootLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: "*",
            element: <ErrorPage />,
            loader: () => {
              throw new Response("Not Found", { status: 404 });
            },
          },
          { index: true, element: <Home /> },
          {
            path: "/riskassessments",
            id: "riskassessments",
            children: [
              {
                index: true,
                element: (
                  <Suspense fallback={<></>}>
                    <RiskAssessmentsPage />
                  </Suspense>
                ),
              },
              {
                path: ":id",
                id: "riskassessment-detail",
                children: [
                  {
                    index: true,
                    element: (
                      <Suspense fallback={<></>}>
                        <RiskAssessmentsDetailPage />
                      </Suspense>
                    ),
                  },
                  {
                    path: "pdf",
                    element: (
                      <Suspense fallback={<></>}>
                        <PDFDelayedComponent delay={2500}>
                          <RiskAssessmentPDFPage />
                        </PDFDelayedComponent>
                      </Suspense>
                    ),
                  },
                ],
              },
            ],
          },
          {
            path: "/materials",
            id: "materials",
            loader: () =>
              import("./store/loaders/materialLoader").then(() =>
                materialCategoriesLoader()
              ),

            children: [{ index: true, element: <MaterialPage /> }],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <React.StrictMode>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </React.StrictMode>
  );
}

export default App;
