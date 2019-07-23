import React from "react";
import { Button } from "antd";
import { HelpCircle } from "react-feather";
import Search from "../components/Search";
import "./Home.css";

interface IHomeProps {
  stopWatching(): void;
  help(): void;
  search(searchString: string): void;
  terms: string[];
  changeTerm(term: string): void;
}

export function Home (props: IHomeProps): JSX.Element {
  return (
    <div className="home-page">
      <div className="top-bar">
        <Button type="primary" id="stop-watching-button" shape="round"
                onClick={props.stopWatching}>Unwatch a course</Button>
        <HelpCircle id="help-icon" onClick={props.help} />
      </div>
      <div className="title">ClassWatch.</div>
      <Search
        home
        terms={props.terms}
        changeTerm={props.changeTerm}
        search={props.search}
      />
    </div>
  );
}

export default Home;
