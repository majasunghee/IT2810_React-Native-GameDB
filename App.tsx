import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import NavBar from "./src/components/Navbar";
import Modal from "./src/components/Modal";
import { Container, Content, List, ListItem } from "native-base";
import SearchBar from "./src/components/SearchBar";
import Pagination from "./src/components/Pagination";
import * as Font from "expo-font";

interface IGame {
  name: string;
  platform: string;
  msrp: number;
  publisher: string;
  developer: string;
  esrb: string;
  releasedate: string;
  romfilesize: string;
  genre: string;
  storelink: string;
  officialsite: string;
}

const App: React.FC<IGame> = () => {
  const [games, setGames] = useState<IGame[]>([]);
  const [search, setSearch] = useState<string>("");

  const [pageNum, setPageNum] = useState<number>(1);

  const [prevBtnDisabled, setPrevBtnDisabled] = useState<boolean>(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState<boolean>(false);
  const pageResults: number = games.length;
  // native base uses fonts that need to be loaded async
  useEffect(() => {
    (async () =>
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      }))();
  }, []);

  const [show, setShow] = useState(false);
  const [details, setDetails] = useState();
  const [index, setIndex] = useState();

  useEffect(() => {
    fetchEvents();
  }, [pageNum, search]);

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

  //Previous button is clickable  except when on the fist page number
  //The next button is clickable as long as there are game elements in pageResults
  function nextButton() {
    if (pageNum >= 1) {
      setPrevBtnDisabled(false);
      if (pageResults < 12) {
        setNextBtnDisabled(true);
      }
    }
    setPageNum(pageNum + 1);
  }

  //Previous button is disabled if on the first page
  //Next button is enabled
  function prevButton() {
    if (pageNum <= 2) {
      setPrevBtnDisabled(true);
    }
    setNextBtnDisabled(false);
    setPageNum(pageNum - 1);
  }

  console.log(pageNum); // console.log("Pageresults = " +pageResults); // console.log("pageNum" + pageNum);
  const styles = StyleSheet.create({
    listItem: {
      backgroundColor: "white",
      elevation: 5,
      margin: 6,
      padding: 5,
    },
    titleText: {
      fontWeight: "bold",
      fontSize: 20,
      textTransform: "uppercase",
    },
  });

  return (
    <Container>
      <StatusBar style="auto" />
      <NavBar />
      <SearchBar setSearch={setSearch} />
      <Content>
        <List style={{ backgroundColor: "#DBDADA" }}>
          {games.slice(0, 6).map((game, index) => {
            return (
              <ListItem
                noIndent
                style={styles.listItem}
                key={index}
                onPress={handleClick.bind(this, index)}
              >
                <Text style={{ lineHeight: 26 }}>
                  <Text style={styles.titleText}>{game.name}</Text>
                  {"\n"}
                  <Text style={{ fontWeight: "bold" }}>Price:</Text>
                  {" " + game.msrp}
                  {"\n"}
                  <Text style={{ fontWeight: "bold" }}>By:</Text>
                  {" " + game.developer}
                </Text>
              </ListItem>
            );
          })}
        </List>
      </Content>
      {show == true ? (
        <View>
          <Modal detail={details} close={closeModal} />
        </View>
      ) : null}
      <Pagination
        pageNum={pageNum}
        nextButton={() => nextButton()}
        prevButton={() => prevButton()}
        prevBtnDisabled={prevBtnDisabled}
        nextBtnDisabled={nextBtnDisabled}
      />
    </Container>
  );
};

export default App;
