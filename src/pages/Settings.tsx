import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../styled_components/Heading";
import Row from "../styled_components/Row";


function Settings() {
  return (
    <Row>
      <Heading as="h1">Update hotel settings</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
