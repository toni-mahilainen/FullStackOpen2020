import React from "react";
import { Icon } from "semantic-ui-react";

interface Props {
  gender: string;
}

const GenderIcon: React.FC<Props> = ({ gender }) => {
  switch (gender) {
    case "male":
      return <Icon name="mars" size="big" />;

    case "female":
      return <Icon name="venus" size="big" />;

    case "other":
      return <Icon name="genderless" size="big" />;

    default:
      return null;
  }
};

export default GenderIcon;
