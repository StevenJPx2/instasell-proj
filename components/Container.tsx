import React from "react";
import { View } from "dripsy";

export default function Container(
  props: {
    children: React.ReactNode;
  } & React.ComponentProps<typeof View>
): JSX.Element {
  return (
    <View
      {...props}
      sx={{
        py: 6,
        px: 5,
        mx: "auto",
        width: ["100%", "1000px"],
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        ...props.sx,
      }}
    />
  );
}
