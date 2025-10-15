import React from "react";
import UserProfile from "./UserProfile";

function MainContent() {
  return (
    <main
      style={{
        padding: "20px",
        backgroundColor: "#eef2f3",
        minHeight: "300px",
      }}
    >
      <UserProfile
        name="Alice Johnson"
        age={28}
        bio="Loves traveling and exploring new cultures."
      />
      <UserProfile
        name="Thabo Mokoena"
        age={32}
        bio="Food enthusiast and mountain hiker."
      />
      <UserProfile
        name="Maria Gonzalez"
        age={25}
        bio="Urban explorer who enjoys photography."
      />
    </main>
  );
}

export default MainContent;
