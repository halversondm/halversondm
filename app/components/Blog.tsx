/**
 * Created by Daniel on 6/26/2016.
 */
import * as React from "react";

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

export class Blog extends React.Component<undefined, BlogState> {

    state: BlogState;

    constructor() {
        super();
        this.state = {items: [], filteredData: []};
        this.filterData = this.filterData.bind(this);
    }

    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/blogService");
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 400) {
                const data = JSON.parse(xhr.responseText);
                this.setState({
                    items: data.items,
                    filteredData: data.items,
                });
            } else {
                console.log("unsucc ", xhr.responseText);
            }
        };
        xhr.onerror = () => {
            console.log(xhr);
        };
        xhr.send();
    }

    createMarkup(html: any) {
        return {__html: html};
    }

    filterData(event: any) {
        const regex = new RegExp(event.target.value, "i");
        const filtered = this.state.items.filter((data: any) => {
            return data.content.search(regex) > -1;
        });
        this.setState({filteredData: filtered});
    }

    render() {
        return (
            <div>
                <h2 className="text-primary">Dan Tech</h2>
                <p>A technology focused blog that I write on <a
                    href="//tech-dan.blogspot.com" target="_blank">Blogger</a>.</p>
                <div className="input-prepend">
                    <span className="add-on"><i className="icon-search"/></span>
                    <input className="span12" type="text" placeholder="Search"
                           onChange={this.filterData}/>
                    <span className="badge badge-warning"
                          hidden={this.state.filteredData.length === this.state.items.length}>
            {this.state.filteredData.length} Items</span>
                </div>
                <div style={{height: "20px"}}/>
                {
                    this.state.filteredData.map((item, i) => {
                        return (
                            <div className="panel panel-info" key={i}>
                                <div className="panel-heading">
                                    <h3 className="panel-title"><a href={item.url}
                                                                   target="_blank">{item.title}</a>
                                    </h3>
                                </div>
                                <div className="panel-body">
                                    <p className="text-left"
                                       dangerouslySetInnerHTML={this.createMarkup(item.content)}/>
                                    <span className="small">{item.published}</span>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}
