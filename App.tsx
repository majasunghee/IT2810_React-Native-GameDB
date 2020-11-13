import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import NavBar from "./src/components/Navbar";
import Modal from "./src/components/Modal";

export default function App() {
  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");

  const [show, setShow] = useState(false);
  const [details, setDetails] = useState();
  const [index, setIndex] = useState();

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleClick = (index) => {
    setIndex(index);
    setDetails(games[index]);
    setShow(true);
  };

  const closeModal = () => {
    setShow(false);
  };

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

  const styles = StyleSheet.create({
    box: {
      padding: 15,
    },
  });

  return (
    <React.Fragment>
      <NavBar></NavBar>
      <View>
        {games.map((game, index) => {
          return (
            <Text
              style={styles.box}
              key={index}
              onPress={handleClick.bind(this, index)}
            >
              {game.name}
            </Text>
          );
        })}
      </View>
      <View>
        <StatusBar style="auto" />
      </View>
      {show == true ? (
        <View>
          <Modal detail={details} close={closeModal} />
        </View>
      ) : null}
    </React.Fragment>
  );
}
