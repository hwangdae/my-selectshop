import styled from "styled-components";
import Sidebar from "@/components/sidebarComponents/Sidebar";
import MapComponent from "@/components/Map";

const Home = () => {
  return (
    <S.Container>
      <Sidebar />
      <S.MapContainer>
        <MapComponent />
      </S.MapContainer>
    </S.Container>
  );
};

export default Home;

const S = {
  Container: styled.div`
    display: flex;
    width: 100%;
    height: 100vh;
  `,
  MapContainer: styled.div`
    flex: 1;
    position: relative; right: 0px;
    width: 50%;
  `,
};
