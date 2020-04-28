import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
// import Profile from '../Profile'
// import ResultTable from '../ResultTable';
import qs from 'querystring';
import Loader from '../UI/Loader/Loader'

import {useTable, useSortBy, useFilters} from 'react-table'
import styled from 'styled-components'

const Styles = styled.div `
  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid black;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    th,
    td {
      margin: 0;
      padding: 1rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }
  }
`

function Table({ columns, data }) {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
    } = useTable(
      {
        columns,
        data,
      },
      useSortBy,
    )
  
    // We don't want to render all 2000 rows for this example, so cap
    // it at 20 for this use case
    // const firstPageRows = rows.slice(0, 20)
  
    return (
      <>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  // Add the sorting props to control sorting
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    {/* Add a sort direction indicator */}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map(
              (row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      )
                    })}
                  </tr>
                )}
            )}
          </tbody>
        </table>
      </>
    )
  }
  

class SearchResult extends Component  {
    constructor(props) {
        super();
        this.props = props;
        
        const parsedSearch = qs.parse(this.props.location.search);
        const searchType = parsedSearch['?type'];
        const value = parsedSearch.value;
        this.state = {
            data: [],
            searchType: searchType,
            value: value,
            showRepo: searchType.includes('repos'),
            loading: true,
        }
        
    }

    async componentDidMount() {
        try {
            const response = await axios.get(`https://api.github.com/search/${this.state.searchType}?q=${this.state.value.toLowerCase()}`)
            // await axios.get('https://api.github.com/search/users?q=bitu')
            // await axios.get('https://api.github.com/search/repositories?q=bitu')
            const data = this.state.searchType.includes('users') ? response.data.items : response.owner.data.items;
            this.setState({ data, loading: false });
        } catch (error) {
            console.log(error);
            
        }
    }

    render() {
        // console.log(this.props);
        // console.log('~~', this.state.data);
        
        const columns = [
            {
              Header: 'Id',
              accessor: 'id'
            }, {
              Header: 'Login',
              accessor: 'login'
            }
          ]
        
        return (
            <div>
                <strong>Search by {this.state.searchType} </strong>
                { this.state.loading
                    ? <Loader />
                    : <Styles>
                        <Table columns={columns} data={this.state.data} />
                    </Styles>}
                {/* { this.state.response.length !== 0 && <ResultTable data={this.state.response} /> } */}
                
            </div>
        )
    }
}

export default withRouter(SearchResult);