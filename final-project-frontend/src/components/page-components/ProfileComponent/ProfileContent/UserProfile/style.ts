import { CustomForm } from "components/shared-style";
import styled from "styled-components";

const UserProfileWrapper = styled.section`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;

  img {
    width: 250px;
    height: 250px;
    object-fit: cover;
    border-radius: 50%;
  }

  @media screen and (min-width: 992px) {
    flex-direction: row;

    img {
      width: 500px;
      height: 500px;
    }
  }
`;

export const UpdateProfileForm = styled(CustomForm)`
  p {
    margin: 0.5rem;
  }
`;

export default UserProfileWrapper;
