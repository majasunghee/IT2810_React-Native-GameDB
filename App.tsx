import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import NavBar from "./src/components/Navbar";
import Modal from "./src/components/Modal";
import { Container, Content, List } from "native-base";
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
  
  //State used for filtering
  const [filter, setFilter] = useState<string>("none");

  //States used for modal
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState();
  const [index, setIndex] = useState();

  //States used for pagination
  const [pageNum, setPageNum] = useState<number>(1);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState<boolean>(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState<boolean>(false);

  let pageResults: number = 0;
  if(filter!=='none'){
    const filteredGames = games.filter((e) => {
      return e.esrb === filter;
    })
    pageResults = filteredGames.length;
  }
  else {
    pageResults= games.length;
    } 
  

  //State used for searching
  const [search, setSearch] = useState<string>(""); 

  //Variable that returns a mutable ref object
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

  //Native base uses fonts that need to be loaded async
  useEffect(() => {
    (async () =>
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
      }))();
  }, []);

  //Renders the fetching games function when either the searchword or pagenumber changes
  useEffect(() => {
    fetchGames();
  }, [pageNum, search, filter]);

  //Resets the pagenumber and checks if there are more than 6 elements to page on when the searchword changes
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      setPageNum(1);
      setPrevBtnDisabled(true);
      checkIfNextBtnDisabled();
    }
  }, [search, filter]);

  //Keeps track of the game element that has been clicked
  const handleClick = (index) => {
    setIndex(index);
    if(filter!=='none'){
      const filteredGames = games.filter((e) => {
        return e.esrb === filter;
      })
      setDetails(filteredGames[index]);
    }
    else {
      setDetails(games[index]);
      } 
    
    setShow(true);
  };

  //Updates the filter value when a filter is chosen
  function updateChange(value) {
    setFilter(value);
  }

  //Closes the modal
  const closeModal = () => {
    setShow(false);
  };

  //Next button is clickable  except when on the last page number
  //The prev button is clickable as long as there are more than 6 elements left from the first page (we are not on the first page)
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

  //Prev button is clickable except when on the first page
  //Next button is always clickable after having paged backwards
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

  //Checks if there are more than 6 elements in the pageResults list. If not, both the prev and next button will be greyed out and disabled.
  function checkIfNextBtnDisabled() {
    if (pageResults > 6) {
      setNextBtnDisabled(false);
    }
    if (pageResults <= 6) {
      setNextBtnDisabled(true);
    }
  }


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
                      key={index}
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
                        key={index}
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
