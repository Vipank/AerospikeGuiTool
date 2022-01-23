import { configureStore } from '@reduxjs/toolkit'
import setAndNamespaceSlice from './setAndNamespaceSlice'

export default configureStore({
  reducer: {
      snReducer : setAndNamespaceSlice
  },
})