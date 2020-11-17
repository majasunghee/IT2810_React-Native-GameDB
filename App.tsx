import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  NativeTouchEvent,
  NativeSyntheticEvent,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import NavBar from "./src/components/Navbar";
import Modal from "./src/components/Modal";
import {
  Container,
  Content,
  List,
  ListItem,
  Picker,
  Icon,
  Left,
  Right,
} from "native-base";
import SearchBar from "./src/components/SearchBar";
import Pagination from "./src/components/Pagination";
import * as Font from "expo-font";
import ListRender from "./src/components/ListRender";
import FilterPicker from "./src/components/FilterPicker";

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
  const [price, setPrice] = useState<string>("");

  const [pageNum, setPageNum] = useState<number>(1);

  const [prevBtnDisabled, setPrevBtnDisabled] = useState<boolean>(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState<boolean>(false);
  const pageResults: number = games.length;

  //state used in searching
  const [search, setSearch] = useState<string>("");

  const [filter, setFilter] = useState<string>("none");

  // native base uses fonts that need to be loaded async
  useEffect(() => {
    (async () =>
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
      }))();
  }, []);

  const [show, setShow] = useState(false);
  const [details, setDetails] = useState();
  const [index, setIndex] = useState();

  const initialRender = useRef(true);

  const fetchGames = () => {
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

  //rendres the fetching games function when either
  //the searchword or pagenumber changes
  useEffect(() => {
    fetchGames();
  }, [pageNum, search]);
  console.log(filter);
  console.log(pageResults);
  console.log(search);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      setPageNum(1);
      setPrevBtnDisabled(true);
      checkIfNextBtnDisabled();
    }
  }, [search]);

  //used to keep track of the game element that
  //has been clicked
  const handleClick = (index: any) => {
    console.log(index + "helooo");
    setIndex(index);
    setDetails(games[index]);
    setShow(true);
  };

  //closes the modal
  const closeModal = (e: any) => {
    setShow(false);
  };

  //Previous button is clickable  except when on the fist page number
  //The next button is clickable as long as there are game elements in pageResults
  function nextButton() {
    if (pageResults > 6) {
      setNextBtnDisabled(false);
      setPageNum(pageNum + 1);
      setPrevBtnDisabled(false);
    }
    if (pageResults < 12) {
      setNextBtnDisabled(true);
    }
  }

  //Previous button is disabled if on the first page
  //Next button is enabled
  function prevButton() {
    if (pageNum > 1) {
      setPrevBtnDisabled(false);
      setPageNum(pageNum - 1);
      setNextBtnDisabled(false);
    }
    if (pageNum <= 2) {
      setPrevBtnDisabled(true);
    }
  }

  function updateChange(value) {
    setFilter(value);
  }

  function checkIfNextBtnDisabled() {
    if (pageResults > 6) {
      setNextBtnDisabled(false);
    }
    if (pageResults <= 6) {
      setNextBtnDisabled(true);
    }
  }

  console.log("Games objects = " + pageResults);
  console.log("Page number is =" + pageNum);
  console.log(nextBtnDisabled);

  //console.log(pageNum); // console.log("Pageresults = " +pageResults); // console.log("pageNum" + pageNum);
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
      <FilterPicker filter={filter} updateChange={updateChange} />
      <Content>
        <View style={show ? { opacity: 0.3 } : null}>
          <List style={{ backgroundColor: "#DBDADA" }}>
            {filter == "none"
              ? games.slice(0, 6).map((game, index) => {
                  return (
                    <ListRender
                      game={game}
                      index={index}
                      handleClick={handleClick.bind(this, index)}
                    />
                  );
                })
              : games
                  .filter((e) => {
                    return e.esrb == filter;
                  })
                  .slice(0, 6)
                  .map((game, index) => {
                    return (
                      <ListRender
                        game={game}
                        index={index}
                        handleClick={handleClick.bind(this, index)}
                      />
                    );
                  })}
          </List>
        </View>
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
