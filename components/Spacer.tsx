import * as React from "react";

import { View } from "dripsy";

export default function Spacer(): JSX.Element {
  return <View style={{ flexDirection: "column", flexGrow: 1 }} />;
}
