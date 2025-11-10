import { render, screen } from "@testing-library/react";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { MockWebServer } from "./test/mock-web-server";
import { usersDTOMock } from "./core/user/infrastructure/user.dto.mock";

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
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

function renderWithProviders(ui: React.ReactElement) {
  return render(<QueryClientWrapper>{ui}</QueryClientWrapper>);
}
