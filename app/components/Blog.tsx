/**
 * Created by Daniel on 6/26/2016.
 */
import * as React from "react";
import { Card } from "react-bootstrap";
import { type ReactNode, useState, useEffect } from "react";

export interface BlogState {
  items: BlogItem[];
  filteredData: BlogItem[];
}

export interface BlogItem {
  url: string;
  title: string;
  content: string;
  published: string;
}

export default function Blog(): ReactNode {
  const [state, setState] = useState<BlogState>({
    items: [],
    filteredData: [],
  });

  useEffect(() => {
    fetch("/api/blog", {
      method: "POST",
    })
      .then(async (data) => await data.json())
      .then((data) => {
        setState({ items: data.items, filteredData: data.items });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function createMarkup(html): { __html: string } {
    return { __html: html };
  }

  function filterData(event): void {
    const regex = new RegExp(event.target.value, "i");
    const filtered = state.items.filter((data) => {
      return data.content.search(regex) > -1;
    });
    setState({ ...state, filteredData: filtered });
  }

  return (
    <div>
      <h2 className="text-primary">Dan Tech</h2>
      <p>
        A technology focused blog that I write on{" "}
        <a href="//tech-dan.blogspot.com" target="_blank" rel="noreferrer">
          Blogger
        </a>
        .
      </p>
      <div className="input-prepend">
        <span className="add-on">
          <i className="icon-search" />
        </span>
        <input
          className="span12"
          type="text"
          placeholder="Search"
          onChange={filterData}
        />
        <span
          className="badge badge-warning"
          hidden={state.filteredData.length === state.items.length}
        >
          {state.filteredData.length} Items
        </span>
      </div>
      <div style={{ height: "20px" }} />
      {state.filteredData.map((item, i) => {
        return (
          <Card bg="secondary" key={i}>
            <Card.Header>
              <a href={item.url} target="_blank" rel="noreferrer">
                {item.title}
              </a>
            </Card.Header>
            <Card.Body>
              <Card.Subtitle className="small">{item.published}</Card.Subtitle>
              <Card.Text dangerouslySetInnerHTML={createMarkup(item.content)} />
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
}
