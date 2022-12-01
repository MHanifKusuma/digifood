import styled from "styled-components";

const ProfileNavbarWrapper = styled.section`
  .nav-item {
    p {
      border: 2px solid #579eff;
      border-radius: 20px;
      padding: 0.5rem 1rem;
      text-align: center;
      transition: 0.25s all ease-in-out;
      font-size: 0.75rem;

      &:hover {
        background-color: #579eff;
        color: #ffffff;
      }

      &.active {
        background-color: #579eff;
        color: #ffffff;
      }

      @media screen and (min-width: 992px) {
        font-size: 1rem;
      }
    }
  }
`;

export default ProfileNavbarWrapper;
