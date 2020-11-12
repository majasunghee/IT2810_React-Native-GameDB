import { StatusBar } from "expo-status-bar";
import { Text, Container, Content , List, ListItem} from 'native-base';
import { StyleSheet, View } from "react-native";
import React, { useState, useEffect } from "react";
//import SearchBar from "./src/components/SearchBar";
import NavBar from "./src/components/Navbar";

export default function App() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    let requestBody = {
      query: `
                    query {
                        games(name: "${search}", skip: 1) {
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

  return (
    <Container>
      <StatusBar style="auto" />
      <NavBar/>
      <Content>
        
        <List>
        {games.map(game => {
          return <ListItem>
            <Text>{game.name}{"\n"}{game.msrp}{"\n"}By: {game.developer}</Text>
            </ListItem>;
        })}
        </List>
      </Content>         
      
    </Container>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });
}
