import React from "react";
import Card from "../components/Card";
const SavedItems = () => {
  return (
    <div className="bg-white dark:bg-gray-900 pt-16 h-full w-full px-10">
      <ul>
        <li>
          <Card />
        </li>
        <li>
          <Card />
        </li>
        <li>
          <Card />
        </li>
        <li>
          <Card />
        </li>
        <li>
          <Card />
        </li>
      </ul>
    </div>
  );
};

export default SavedItems;
