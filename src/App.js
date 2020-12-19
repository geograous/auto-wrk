import React from "react";
import { Table } from "antd";
import logo from "./logo.svg";
import "antd/dist/antd.css";
import "./App.css";

import list from "./data.json";

console.log("data:", list);

function Item({ cdn, title }) {
  return (
    <div className="Item">
      <img src={cdn} />
      <h5>{title}</h5>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <section>
        <Table dataSource={list} pagination={false}>
          <Table.Column
            width="160px"
            title="结果"
            render={(item) => <Item {...item} />}
          />
          <Table.Column
            title="对比"
            render={(row) => (
              <div>
                {row.items.map((item, idx) => (
                  <Item key={idx} {...item} />
                ))}
              </div>
            )}
          />
        </Table>
      </section>
    </div>
  );
}

export default App;
