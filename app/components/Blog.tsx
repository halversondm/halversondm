/**
 * Created by Daniel on 6/26/2016.
 */
import * as React from 'react'
import {Card} from 'react-bootstrap'
import {type ReactNode} from 'react'

export interface BlogState {
  items: BlogItem[]
  filteredData: BlogItem[]
}

export interface BlogItem {
  url: string
  title: string
  content: string
  published: string
}

export class Blog extends React.Component<unknown, BlogState> {
  state: BlogState

  constructor() {
    super({})
    this.state = {items: [], filteredData: []}
    this.filterData = this.filterData.bind(this)
  }

  componentDidMount(): void {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/blogService')
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 400) {
        const data = JSON.parse(xhr.responseText)
        this.setState({
          items: data.items,
          filteredData: data.items
        })
      } else {
        console.log('unsucc ', xhr.responseText)
      }
    }
    xhr.onerror = () => {
      console.log(xhr)
    }
    xhr.send()
  }

  createMarkup(html): { __html: string } {
    return {__html: html}
  }

  filterData(event): void {
    const regex = new RegExp(event.target.value, 'i')
    const filtered = this.state.items.filter((data) => {
      return data.content.search(regex) > -1
    })
    this.setState({filteredData: filtered})
  }

  render(): ReactNode {
    return (
            <div>
                <h2 className="text-primary">Dan Tech</h2>
                <p>A technology focused blog that I write on <a
                    href="//tech-dan.blogspot.com" target="_blank" rel="noreferrer">Blogger</a>.</p>
                <div className="input-prepend">
                    <span className="add-on"><i className="icon-search"/></span>
                    <input className="span12" type="text" placeholder="Search"
                           onChange={this.filterData}/>
                    <span className="badge badge-warning"
                          hidden={this.state.filteredData.length === this.state.items.length}>
            {this.state.filteredData.length} Items</span>
                </div>
              <div style={{height: '20px'}}/>
                {
                    this.state.filteredData.map((item, i) => {
                      return (
                            <Card bg="secondary" key={i}>
                                <Card.Header>
                                  <a href={item.url} target="_blank" rel="noreferrer">{item.title}</a>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Subtitle className="small">{item.published}</Card.Subtitle>
                                    <Card.Text dangerouslySetInnerHTML={this.createMarkup(item.content)}/>
                                </Card.Body>
                            </Card>
                      )
                    })
                }
            </div>
    )
  }
}
