import React, { useEffect, useState }  from 'react';
import '../Components/List.css';
import { BsGithub, BsSearch } from "react-icons/bs";

const List = () => {
    const [data, setData] = useState([]);
    const [sortRow, setSortRow] = useState([]);
    const [user, setUser] = useState("");
    const [sortType, setSortType] = useState('');

    const fetchData = async () => {
        try {
            const apiUrl = `https://api.github.com/users/${user}/repos`;
        fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setData(data);
            setSortRow(data);
        })
        }
        catch (error){
            console.log(error);
        }
    }

    useEffect (() => {
        const sortProperty = sortType;
        if (sortProperty === "stargazers_count") {
            const sorted = [...data].sort((a, b) => (b.stargazers_count > a.stargazers_count) ? 1 : -1);
            setSortRow(sorted);
        } else {
            if (sortProperty === "Popular") {
                const countStar = [...data].map(a => a.stargazers_count).reduce((acc, star) => acc + star);
                const countFork = [...data].map(a => a.forks_count).reduce((acc, fork) => acc + fork);
                const sorted = [...data].sort((a, b) => ((b.stargazers_count / countStar + b.forks_count / countFork) > (a.stargazers_count / countStar + a.forks_count / countFork)) ? 1 : -1);
                setSortRow(sorted);
            }
            else {
                if (sortProperty === "Alphabet") {
                    setSortRow(data);
                }
                else {
                    const sorted = [...data].sort((a, b) => (b.stargazers_count > a.stargazers_count) ? 1 : -1);
                    const sorted2 = sorted.filter(e => e.forks_count === 0);
                    setSortRow(sorted2);
                }
            }
        }
        console.log(sortRow);
      }, [sortType]);

  return (
    <div className='container-fluid'>
    <div className='container-fluid header'>
        <div className='row' style={{marginTop:"0"}}>
            <span><BsGithub size={50} style={{paddingTop:"2rem"}}/></span>
            <span><h1>Repositories Search Engine</h1></span>
        </div>
        <div className='row'>
            <input className="form__input" type="text" value={user}
                onChange = {(e) => setUser(e.target.value)}
                placeholder = "Please enter username or organiztion name"
            />
            <span><button type="button" className="btn" onClick = {fetchData} style={{marginTop:"1rem"}}><BsSearch size={30}/></button></span>
        </div>
    </div>
    <div>
        <label>Sort by: </label>
        <select className='select' onChange={(e) => setSortType(e.target.value)}>
            <option value='Alphabet'>Alphabet</option>
            <option value='stargazers_count'>Star</option>
            <option value='Popular'>Popular</option>
            <option value='Popular2'>Popular with unfork</option>
        </select>
    {/* <Select options={options} /> */}
    {(data.message && data.message === "Not Found") ? (
        <>
        {" "}
        <p>No repos, sorry</p>
        </>
    )
    : ((!data || data.length === 0) ? (
        <>
        {" "}
        <p></p>
        </>) : ((
        <>
        {" "}
        <div className="limiter">
            <div className="container-table100">
                <div className="wrap-table100">
                    <div className="table100 ver1 m-b-110">
                        <div className="table100-head">
                            <table>
                                <thead>
                                    <tr className="row100 head">
                                        <th className="cell100 column1">Name</th>
                                        <th className="cell100 column2">Stars</th>
                                        <th className="cell100 column3">Forks</th>
                                        <th className="cell100 column4">Description</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>

                        <div className="table100-body js-pscroll">
                            <table>
                                <tbody>
                                    {sortRow.map((repo) => {
                                        return (
                                            <tr key={repo.id}>
                                                <td className="cell100 column1" style={{textAlign:"center"}}>{repo.name} </td>
                                                <td className="cell100 column2" style={{textAlign:"center"}}> {repo.stargazers_count} </td>
                                                <td className="cell100 column3" style={{textAlign:"center"}}> {repo.forks_count} </td>
                                                <td className="cell100 column4" style={{textAlign:"center"}}> {repo.description} </td>
                                            </tr>
                                        );
                                        // <tr key={el.time}>
                                        // <td className="">{(new Date(el.time)).toLocaleString()}</td>
                                        // <td className="cell100 column1">{el.status == 1 ? "ON" : "OFF"}</td>
                                        // <td className="cell100 column1">{el.isAuto == 1 ? "ON" : "OFF"}</td>
                                        // </tr>
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )))}
    </div>
      </div>
  );
};
export default List;