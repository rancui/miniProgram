export default function versionCompare(t, e) {
    if (!t) return false;
    t = (t.match(/\d*\.\d*\.\d*/) || t.match(/\d*\.\d*/))[0], e = (e.match(/\d*\.\d*\.\d*/) || e.match(/\d*\.\d*/))[0];
    var r = t.split("."), a = e.split(".");
    a.length < 3 && a.push(0);
    for (var s = !0, n = 0; n < r.length; n++) {
        if (a[n] && parseInt(r[n], 10) > parseInt(a[n], 10)) {
            s = true;
            break;
        }
        if (parseInt(r[n], 10) === parseInt(a[n], 10)) s = !0; else if (parseInt(r[n], 10) < parseInt(a[n], 10)) {
            s = false;
            break;
        }
    }
    return s;
};