import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState, useEffect, useRef } from "react";
import Pagination from './src/components/Pagination';



export default function App() {

    const [games, setGames] = useState([]);
    const [search, setSearch] = useState("");
    const [pageNum, setPageNum] = useState(1);

    //let nextPage = (pageNum+1);

    const pageResults = games.length;  
  
    //let total_results = games.length;
    //console.log("Number of results" + total_results);
   // console.log("this is page:" + pageNum);
  
    useEffect(() => {
      fetchEvents();
     }, [pageNum]);
  
    const fetchEvents = () => {
      let requestBody = {
        query: `
                    query {
                        games(name: "${search}", skip: ${pageNum}) {
                        _id
                        name
                        platform                        
                        msrp
                        publisher
                        developer
                        esrb
                        releasedate
                        romfilesize
                        genre
                        storelink
                        officialsite
                        }                     
                    }
              `,
      };
  
      fetch("http://it2810-40.idi.ntnu.no:3000/graphql", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          const data = res.json();
          return data;
        })
        .then((resData) => {
          const games = resData.data.games;
          setGames(games);
        })
        .catch((err) => {
          console.log(err);
        });
    };



    function nextButton() {
      if (pageResults >= 0) {
        setPageNum(pageNum+1);
      }
      return pageNum;
    }

    console.log("Pageresults = " +pageResults);
    console.log("pageNum" + pageNum);


//        <Button type="button" onPress={() => handleClick()}>This works in the return statement of app.js</Button>

  return (
    <React.Fragment>
        <View>
            {games.map((game, index) => {
              return (
                  <Text>{game.name}</Text>
              );
            })}
        </View>
        <Pagination pageNum={pageNum} onPress={() => nextButton()}/>
    <View>
      <StatusBar style="auto" />
    </View>
    </React.Fragment>
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
}