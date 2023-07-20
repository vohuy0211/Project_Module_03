import userSlice from "./UserSlice";
import bookSlice from "./bookSlice";
import productBookSlice from "./updateData";
import searchSlice from "./searchSlice";
export const rootReducer = {
  user: userSlice,
  book: bookSlice,
  update: productBookSlice,
  search: searchSlice,
};

export default rootReducer;
