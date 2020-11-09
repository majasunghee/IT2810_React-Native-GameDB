import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useRef } from "react";



export default function App(props) {

    const [games, setGames] = useState([]);
    const [search, setSearch] = useState("");
  
    const [skip, setSkip] = useState(1);
  
    const [show, setShow] = useState(false);
    const [details, setDetails] = useState();
    const [index, setIndex] = useState();
  
    if (props.search !== search) {
      setSearch(props.search);
    }
  
    const handleClick = (index) => {
      setIndex(index);
      setDetails(games[index]);
      setShow(true);
    };
  
    //update fetchEvents when search updates
    useEffect(() => {
      fetchEvents();
    }, []);
  
    //fetch from db. Skip defines whitch pagenumber the user are currently viewing
    const fetchEvents = () => {
      console.log("search: ", search);
      let requestBody = {
        query: `
                    query {
                        games(name: "zelda", skip: 1) {
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
          if (res.status !== 200 && res.status !== 201) {
            throw new Error("Failed!");
          }
          const data = res.json();
          console.log(data);
          return data;
        })
        .then((resData) => {
          // set fetched data to state "games"
          const games = resData.data.games;
          setGames(games);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    console.log(games);




  return (
    <React.Fragment>
        <View>
            {games.map((game, index) => {
              return (
                  <Text>{game.name}</Text>
              );
            })}
        </View>
    
    <View>
      <Text>Open up App.js to start working on your app!</Text>
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