import { render, screen } from "@testing-library/react";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren, ReactNode } from "react";
import { MockWebServer } from "./test/mock-web-server";
import { usersDTOMock } from "./core/user/infrastructure/user.dto.mock";
import { AppRoutes } from "./core/shared/ui/routes";
import { MemoryRouter } from "react-router-dom";

const mockWebServer = new MockWebServer();

describe("App", () => {
  beforeAll(() => mockWebServer.start());
  afterEach(() => mockWebServer.resetHandlers());
  afterAll(() => mockWebServer.close());

  it("should render", () => {
    renderWithProviders(<App />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it("should display a list of users", async () => {
    givenUsers();
    renderWithProviders(<App />);
    const firstUser = await screen.findByText(usersDTOMock[0].name);
    const secondUser = await screen.findByText(usersDTOMock[1].name);
    expect(firstUser).toBeInTheDocument();
    expect(secondUser).toBeInTheDocument();
  });
});

function givenUsers() {
  mockWebServer.addRequestHandlers([
    {
      method: "get",
      endpoint: "https://jsonplaceholder.typicode.com/users/",
      httpStatusCode: 200,
      response: usersDTOMock,
    },
  ]);
}

export const QueryClientWrapper = ({ children }: PropsWithChildren) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return (
    <RouterWrapper>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </RouterWrapper>
  );
};

type RouterWrapperProps = {
  children?: ReactNode;
  initialEntries?: string[];
};

export const RouterWrapper = ({
  children = <AppRoutes />,
  initialEntries = ["/"],
}: RouterWrapperProps) => {
  return (
    <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
  );
};

function renderWithProviders(ui: React.ReactElement) {
  return render(<QueryClientWrapper>{ui}</QueryClientWrapper>);
}
