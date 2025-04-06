import { useEffect } from "react";
import { getCabins } from "../services/apiCabins";
import Row from "../styled_components/Row";
import Heading from "../styled_components/Heading";

function Cabins() {
  useEffect(function () {
    getCabins().then((data) => console.log(data));
  }, []);

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img src="https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg" />
    </Row>
  );
}

export default Cabins;
