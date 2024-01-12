function resolveDependency(key, buildOrder, dependents, dependencies, added) {
    if (added[key] || Object.keys(dependencies[key]).length > 0) return;
    buildOrder.push(key);
    added[key] = true;
    Object.keys(dependents[key]).forEach((otherKey) => {
        delete dependencies[otherKey][key];
        delete dependents[key][otherKey];
        resolveDependency(otherKey, buildOrder, dependents, dependencies, added);
    });
}

function generateDependencyGraph(projects, dependencies) {
    var graph = {};
    projects.forEach((project) => {
        graph[project] = {};
    })
    dependencies.forEach((dependencyPair) => {
        if (!graph[dependencyPair[0]] || !graph[dependencyPair[1]]) {
            throw "Invalid list of dependencies";
        }
        graph[dependencyPair[0]][dependencyPair[1]] = true;
    })
    return graph;
}

function generateDependentsGraph(projects, dependencies) {
    var graph = {};
    projects.forEach((project) => {
        graph[project] = {};
    })
    dependencies.forEach((dependencyPair) => {
        if (!graph[dependencyPair[0]] || !graph[dependencyPair[1]]) {
            throw "Invalid list of dependencies";
        }
        graph[dependencyPair[1]][dependencyPair[0]] = true;
    })
    return graph;
}

function buildOrder(projects, dependencies) {
    var dependents = generateDependentsGraph(projects, dependencies);
    dependencies = generateDependencyGraph(projects, dependencies);
    var buildOrder = [];
    var added = {};
    projects.forEach((project) => {
        resolveDependency(project, buildOrder, dependents, dependencies, added);
    })
    if (buildOrder.length != projects.length) {
        throw "No valid build order";
    }

    return buildOrder;
}
var a = "a"; var b = "b"; var c = "c"; var d = "d"; var e = "e"; var f = "f";

var output = buildOrder(["a", "b", "c", "d", "e", "f"], [["d", "a"], [b, f], [d, b], [a, f], [c, d]]);

console.log(output);