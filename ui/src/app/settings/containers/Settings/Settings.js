import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import actions from "app/settings/actions";
import Routes from "../../components/Routes";
import Section from "app/base/components/Section";
import SettingsNav from "../../components/Nav";

const Settings = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.config.fetch());
  }, [dispatch]);

  return (
    <Section title="Settings" sidebar={<SettingsNav />}>
      <Routes />
    </Section>
  );
};

export default Settings;
