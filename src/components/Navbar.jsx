import styled from "styled-components";
import Button from "./Button";
import { AddRounded, ExploreRounded } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex: 1;
  background: ${({ theme }) => theme.navbar};
  color: ${({ theme }) => theme.text_primary};
  font-weight: bold;
  font-size: 22px;
  padding: 14px 50px;
  justify-content: space-between;
  align-items: center;
  @media only screen and (max-width: 600px) {
    padding: 10px 12px;
  }
`;

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const currentUrl = location.pathname.split("/");

  return (
    <Container>
      GenAI
      {currentUrl[1] === "post" ? (
        <Button
          text="Explore Posts"
          leftIcon={<ExploreRounded style={{ fontSize: "18px" }} />}
          onClick={() => navigate("/")}
          type="secondary"
        />
      ) : (
        <Button
          text="Create New Post"
          leftIcon={<AddRounded style={{ fontSize: "18px" }} />}
          onClick={() => navigate("/post")}
        />
      )}
    </Container>
  );
}

export default Navbar;
