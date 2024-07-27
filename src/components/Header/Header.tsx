import Image from "next/image";

import { StyledHeader, StyledHeaderTitle } from "./StyledHeader";

const Header: React.FC = () => (
  <StyledHeader>
    <StyledHeaderTitle>
      <h1>name-app</h1>
      <p>Page developed by Paula López Antelo</p>
    </StyledHeaderTitle>
  </StyledHeader>
);
export { Header };
