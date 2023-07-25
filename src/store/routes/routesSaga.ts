import { call, put, takeEvery } from 'redux-saga/effects'
import { fetchPolylines } from '../../http-service/fetchPolylines'
import { Point } from './routes'
import { fetchPolylineDataError, fetchPolylineDataSuccess } from './routesSlice'

function* fetchPolylineDataStartWorker({
    payload: { id, points },
}: {
    payload: { id: string; points: Point[] }
}) {
    try {
        // @ts-ignore
        const polylineEncoded = yield call(fetchPolylines, points)
        yield put(fetchPolylineDataSuccess({ id, polyline: polylineEncoded }))
    } catch (error) {
        yield put(fetchPolylineDataError())
    }
}

export function* polylinesSaga() {
    // @ts-ignore
    yield takeEvery('routes/fetchPolylineDataStart', fetchPolylineDataStartWorker)
}
