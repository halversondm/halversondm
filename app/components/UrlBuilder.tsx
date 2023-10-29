/**
 * Created by Daniel on 6/26/2016.
 */
import * as React from 'react'
import { Button } from 'react-bootstrap'
import { type ReactNode, useState } from 'react'

interface UrlBuilderState {
  queries: Query[]
  query: Query
  baseUrl: string
  assembledUrl: string
}

interface Query {
  key: string
  value: string
}

export default function UrlBuilder (): ReactNode {
  const [state, setState] = useState<UrlBuilderState>(initialState())

  function initialState (): UrlBuilderState {
    return {
      queries: [],
      query: { key: '', value: '' },
      baseUrl: '',
      assembledUrl: ''
    }
  }

  function addQuery (event): void {
    event.preventDefault()
    const queries = state.queries
    queries.push(state.query)
    setState({ ...state, queries, query: { key: '', value: '' } })
  }

  function assemble (event): void {
    event.preventDefault()
    let assembled = state.baseUrl + '?'
    const queries = state.queries
    let count = 0

    queries.forEach((query) => {
      count += 1
      assembled += query.key + '=' + query.value
      setCookie(query.key, query.value)
      if (count < queries.length) {
        assembled += '&'
      }
    })
    setCookie('baseUrl', state.baseUrl)
    setState({ ...state, assembledUrl: assembled })
  }

  function setCookie (cname, value): void {
    const d = new Date()
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000))
    const expires = 'expires=' + d.toUTCString()
    document.cookie = cname + '=' + value + '; ' + expires
  }

  function launch (event): void {
    event.preventDefault()
    const myWindow = window.open('', 'MsgWindow', 'toolbar=yes, scrollbars=yes, ' +
            'resizable=yes, width=1024, height=768')
    if (myWindow != null) {
      myWindow.document.write('<html><head><meta http-equiv="X-UA-Compatible"' +
                ' content="IE=edge"></head></head><body><iframe src="' + state.assembledUrl + '" width="100%"' +
                ' height="100%" /></body></html>"')
    }
  }

  function keyChange (event): void {
    const query = state.query
    query.key = event.target.value
    setState({ ...state, query })
  }

  function valueChange (event): void {
    const query = state.query
    query.value = event.target.value
    setState({ ...state, query })
  }

  function baseUrlChange (event): void {
    setState({ ...state, baseUrl: event.target.value })
  }

  return (
            <div>
                <h2 className="text-primary">URL Builder</h2>
                <h3>Build a URL with query parameters and launch it!</h3>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Key</th>
                        <th>Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        state.queries.map((query, i) => {
                          return <tr key={i}>
                                <td>{query.key}</td>
                                <td>{query.value}</td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
                <hr/>
                <fieldset>
                    <legend>Add a new query parameter</legend>
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label htmlFor="queryKey"
                                   className="col-sm-2 control-label">Key</label>
                            <div className="col-sm-10">
                                <input id="queryKey" value={state.query.key} type="text"
                                       onChange={keyChange} className="form-control"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="queryValue"
                                   className="col-sm-2 control-label">Value</label>
                            <div className="col-sm-10">
                                <input id="queryValue" value={state.query.value}
                                       onChange={valueChange}
                                       type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-10 col-sm-2">
                                <Button variant="primary" id="addQuery"
                                        onClick={addQuery}> + Add Query Parameter
                                </Button>
                            </div>
                        </div>
                    </form>
                </fieldset>
                <fieldset>
                    <legend>Assemble the URL and Launch it</legend>
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label htmlFor="baseUrl" className="col-sm-2 control-label">Base
                                URL</label>
                            <div className="col-sm-10">
                                <input id="baseUrl" value={state.baseUrl} type="text"
                                       className="form-control" onChange={baseUrlChange}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-10 col-sm-2">
                                <Button variant="primary" id="assemble"
                                        onClick={assemble}>Assemble URL
                                </Button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="assembledUrl" className="col-sm-2 control-label">Assembled
                                URL</label>
                            <div className="col-sm-10">
              <textarea id="assembledUrl" rows={4}
                        value={state.assembledUrl} readOnly={true}
                        className="form-control"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-10 col-sm-2">
                                <Button variant="danger" id="launch"
                                        onClick={launch}>Launch
                                </Button>
                            </div>
                        </div>
                    </form>
                </fieldset>
            </div>
  )
}
