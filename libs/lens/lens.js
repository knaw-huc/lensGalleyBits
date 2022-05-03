!function r(o, i, s) {
    function a(e, t) {
        if (!i[e]) {
            if (!o[e]) {
                var n = "function" == typeof require && require;
                if (!t && n) return n(e, !0);
                if (c) return c(e, !0);
                throw(t = new Error("Cannot find module '" + e + "'")).code = "MODULE_NOT_FOUND", t
            }
            n = i[e] = {exports: {}}, o[e][0].call(n.exports, function (t) {
                return a(o[e][1][t] || t)
            }, n, n.exports, r, o, i, s)
        }
        return i[e].exports
    }

    for (var c = "function" == typeof require && require, t = 0; t < s.length; t++) a(s[t]);
    return a
}({
    1: [function (t, e, n) {
        window.Lens = t("./src/ubhd-lens")
    }, {"./src/ubhd-lens": 207}],
    2: [function (t, e, n) {
    }, {}],
    3: [function (t, e, n) {
        "use strict";

        function r(t) {
            t = r.prepareOptions(t), i.call(this, t), this.bySourceId = this.addIndex("by_source_id", {property: "source_id"}), this.nodeTypes = t.nodeTypes, void 0 === t.seed && (this.create({
                id: "document",
                type: "document",
                guid: t.id,
                creator: t.creator,
                created_at: t.created_at,
                views: r.views,
                title: "",
                abstract: "",
                authors: []
            }), a.each(r.views, function (t) {
                this.create({id: t, type: "view", nodes: []})
            }, this))
        }

        var a = t("underscore"), o = t("../substance/util"), i = t("../substance/document"),
            c = (r.Prototype = function () {
                this.fromSnapshot = function (t, e) {
                    return r.fromSnapshot(t, e)
                }, this.getNodeBySourceId = function (t) {
                    t = this.bySourceId.get(t);
                    return t[Object.keys(t)[0]]
                }, this.getHeadings = function () {
                    return a.filter(this.get("content").getNodes(), function (t) {
                        return "heading" === t.type
                    })
                }, this.getTocNodes = function () {
                    return a.filter(this.get("content").getNodes(), function (t) {
                        return t.includeInToc()
                    })
                }
            }, r.prepareOptions = function (t) {
                return (t = t || {}).nodeTypes = a.extend(r.nodeTypes, t.nodeTypes), t.schema = r.getSchema(t.nodeTypes), t
            }, r.getSchema = function (t) {
                var n = o.deepclone(i.schema);
                return n.id = "lens-article", n.version = "2.0.0", a.each(t, function (t, e) {
                    n.types[e] = t.Model.type
                }), n
            }, r.fromSnapshot = function (t, e) {
                return (e = e || {}).seed = t, new r(e)
            }, r.views = ["content", "figures", "footnotes", "citations", "definitions", "info"], r.nodeTypes = t("./nodes"), r.ViewFactory = t("./view_factory"), r.ResourceView = t("./resource_view"), {
                id: "lens_article",
                nodes: {
                    document: {
                        type: "document",
                        id: "document",
                        views: ["content"],
                        title: "The Anatomy of a Lens Article",
                        authors: ["contributor_1", "contributor_2", "contributor_3"],
                        guid: "lens_article"
                    },
                    content: {type: "view", id: "content", nodes: ["cover"]},
                    cover: {id: "cover", type: "cover"},
                    contributor_1: {id: "contributor_1", type: "contributor", name: "Michael Aufreiter"},
                    contributor_2: {id: "contributor_2", type: "contributor", name: "Ivan Grubisic"},
                    contributor_3: {id: "contributor_3", type: "contributor", name: "Rebecca Close"}
                }
            });
        r.describe = function () {
            var i = new r({seed: c}), s = 0;
            return a.each(r.nodeTypes, function (t) {
                var e = "heading_" + (t = t.Model).type.id, n = (i.create({
                    id: e,
                    type: "heading",
                    content: t.description.name,
                    level: 1
                }), t.description.remarks.join(" ")), r = "text_" + t.type.id + "_intro", o = (i.create({
                    id: r,
                    type: "text",
                    content: n
                }), i.show("content", [e, r], -1), i.create({
                    id: e + "_properties",
                    type: "text",
                    content: t.description.name + " uses the following properties:"
                }), i.show("content", [e + "_properties"], -1), []);
                a.each(t.description.properties, function (t, e) {
                    var n = "text_" + ++s;
                    i.create({id: n, type: "text", content: e + ": " + t}), i.create({
                        id: s + "_annotation",
                        type: "code",
                        path: [n, "content"],
                        range: [0, e.length]
                    }), o.push(n)
                }), i.create({
                    id: e + "_property_list",
                    type: "list",
                    items: o,
                    ordered: !1
                }), i.show("content", [e + "_property_list"], -1), i.create({
                    id: e + "_example",
                    type: "text",
                    content: "Here's an example:"
                }), i.create({
                    id: e + "_example_codeblock",
                    type: "codeblock",
                    content: JSON.stringify(t.example, null, "  ")
                }), i.show("content", [e + "_example", e + "_example_codeblock"], -1)
            }), i
        }, r.Prototype.prototype = i.prototype, (r.prototype = new r.Prototype).constructor = r, Object.defineProperties(r.prototype, {
            id: {
                get: function () {
                    return this.get("document").guid
                }, set: function (t) {
                    this.get("document").guid = t
                }
            }, creator: {
                get: function () {
                    return this.get("document").creator
                }, set: function (t) {
                    this.get("document").creator = t
                }
            }, created_at: {
                get: function () {
                    return this.get("document").created_at
                }, set: function (t) {
                    this.get("document").created_at = t
                }
            }, title: {
                get: function () {
                    return this.get("document").title
                }, set: function (t) {
                    this.get("document").title = t
                }
            }, abstract: {
                get: function () {
                    return this.get("document").abstract
                }, set: function (t) {
                    this.get("document").abstract = t
                }
            }, on_behalf_of: {
                get: function () {
                    return this.get("document").on_behalf_of
                }, set: function (t) {
                    this.get("document").on_behalf_of = t
                }
            }, authors: {
                get: function () {
                    var t = this.get("document");
                    return t.authors ? a.map(t.authors, function (t) {
                        return this.get(t)
                    }, this) : ""
                }, set: function (t) {
                    this.get("document").authors = a.clone(t)
                }
            }, views: {
                get: function () {
                    return this.get("document").views.slice(0)
                }
            }
        }), e.exports = r
    }, {
        "../substance/document": 173,
        "../substance/util": 182,
        "./nodes": 76,
        "./resource_view": 126,
        "./view_factory": 127,
        underscore: 130
    }],
    4: [function (t, e, n) {
        var r = {
            1: "January",
            2: "February",
            3: "March",
            4: "April",
            5: "May",
            6: "June",
            7: "July",
            8: "August",
            9: "September",
            10: "October",
            11: "November",
            12: "December"
        }, o = {
            formatDate: function (t) {
                var e, n, t = t.split("-");
                return 3 <= t.length ? new Date(t[0], t[1] - 1, t[2]).toUTCString().slice(5, 16) : 2 === t.length ? (e = t[1].replace(/^0/, ""), n = t[0], r[e] + " " + n) : n
            }
        };
        e.exports = o
    }, {}],
    5: [function (t, e, n) {
        "use strict";
        t = t("./article");
        e.exports = t
    }, {"./article": 3}],
    6: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.Node.call(this, t, e)
        }

        var o = t("../../../substance/document");
        r.type = {
            id: "affiliation",
            parent: "content",
            properties: {
                source_id: "string",
                city: "string",
                country: "string",
                department: "string",
                institution: "string",
                label: "string",
                specific_use: "string"
            }
        }, r.description = {
            name: "Affiliation",
            description: "Person affiliation",
            remarks: ["Name of a institution or organization, such as a university or corporation, that is the affiliation for a contributor such as an author or an editor."],
            properties: {
                institution: "Name of institution",
                department: "Department name",
                country: "Country where institution is located",
                city: "City of institution",
                label: "Affilation label. Usually a number counting up"
            }
        }, r.example = {
            id: "affiliation_1",
            source_id: "aff1",
            city: "Jena",
            country: "Germany",
            department: "Department of Molecular Ecology",
            institution: "Max Planck Institute for Chemical Ecology",
            label: "1",
            type: "affiliation"
        }, (r.Prototype = function () {
        }).prototype = o.Node.prototype, r.prototype = new r.Prototype, o.Node.defineProperties(r.prototype.constructor = r), e.exports = r
    }, {"../../../substance/document": 173}],
    7: [function (t, e, n) {
        "use strict";
        e.exports = {Model: t("./affiliation")}
    }, {"./affiliation": 6}],
    8: [function (t, e, n) {
        function r(t, e) {
            o.Node.call(this, t, e)
        }

        var o = t("../../../substance/document");
        r.type = {
            id: "annotation",
            properties: {path: ["array", "string"], range: ["array", "number"]}
        }, (r.Prototype = function () {
            this.getLevel = function () {
                return this.constructor.fragmentation
            }
        }).prototype = o.Node.prototype, ((r.prototype = new r.Prototype).constructor = r).NEVER = 1, r.OK = 2, r.fragmentation = r.DONT_CARE = 3, o.Node.defineProperties(r), e.exports = r
    }, {"../../../substance/document": 173}],
    9: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            this.node = t, this.viewFactory = e, this.el = this.createElement(), this.el.dataset.id = t.id, this.$el = $(this.el), this.setClasses()
        }

        r.Prototype = function () {
            this.createElement = function () {
                return document.createElement("span")
            }, this.setClasses = function () {
                this.$el.addClass("annotation").addClass(this.node.type)
            }, this.render = function () {
                return this
            }
        }, r.prototype = new r.Prototype, e.exports = r
    }, {}],
    10: [function (t, e, n) {
        e.exports = {Model: t("./annotation.js"), View: t("./annotation_view.js")}
    }, {"./annotation.js": 8, "./annotation_view.js": 9}],
    11: [function (t, e, n) {
        function r(t, e) {
            i.call(this, t, e)
        }

        var o = t("../../../substance/document"), i = t("../annotation/annotation");
        r.type = {id: "emphasis", parent: "annotation", properties: {style: "string"}}, (r.Prototype = function () {
        }).prototype = i.prototype, ((r.prototype = new r.Prototype).constructor = r).fragmentation = i.DONT_CARE, o.Node.defineProperties(r), e.exports = r
    }, {"../../../substance/document": 173, "../annotation/annotation": 8}],
    12: [function (t, e, n) {
        function r(t) {
            o.call(this, t)
        }

        var o = t("../annotation").View;
        (r.Prototype = function () {
            this.setClasses = function () {
                o.prototype.setClasses.call(this), this.$el.addClass(this.node.style)
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"../annotation": 10}],
    13: [function (t, e, n) {
        e.exports = {Model: t("./author_callout.js"), View: t("./author_callout_view.js")}
    }, {"./author_callout.js": 11, "./author_callout_view.js": 12}],
    14: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.call(this, t, e)
        }

        var t = t("../../../substance/document"), o = t.Composite;
        r.type = {
            id: "box",
            parent: "content",
            properties: {source_id: "string", label: "string", children: ["array", "paragraph"]}
        }, r.description = {
            name: "Box",
            remarks: ["A box type."],
            properties: {label: "string", children: "0..n Paragraph nodes"}
        }, r.example = {
            id: "box_1",
            type: "box",
            label: "Box 1",
            children: ["paragraph_1", "paragraph_2"]
        }, (r.Prototype = function () {
            this.getChildrenIds = function () {
                return this.properties.children
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, t.Node.defineProperties(r.prototype.constructor = r), e.exports = r
    }, {"../../../substance/document": 173}],
    15: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            i.call(this, t, e)
        }

        var o = t("../node").View, i = t("../composite").View, s = t("../../../substance/application").$$;
        (r.Prototype = function () {
            this.render = function () {
                var t;
                return o.prototype.render.call(this), this.node.label && (t = s(".label", {text: this.node.label}), this.content.appendChild(t)), this.renderChildren(), this.el.appendChild(this.content), this
            }
        }).prototype = i.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"../../../substance/application": 160, "../composite": 33, "../node": 91}],
    16: [function (t, e, n) {
        "use strict";
        e.exports = {Model: t("./box"), View: t("./box_view")}
    }, {"./box": 14, "./box_view": 15}],
    17: [function (t, e, n) {
        function r(t, e) {
            o.call(this, t, e)
        }

        var o = t("../annotation/annotation");
        r.type = {id: "capitalize", parent: "annotation", properties: {}}, (r.Prototype = function () {
        }).prototype = o.prototype, ((r.prototype = new r.Prototype).constructor = r).fragmentation = o.DONT_CARE, e.exports = r
    }, {"../annotation/annotation": 8}],
    18: [function (t, e, n) {
        e.exports = {Model: t("./capitalize.js"), View: t("../annotation/annotation_view.js")}
    }, {"../annotation/annotation_view.js": 9, "./capitalize.js": 17}],
    19: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.Composite.call(this, t, e)
        }

        var o = t("../../../substance/document");
        r.type = {
            id: "caption",
            parent: "content",
            properties: {source_id: "string", title: "paragraph", children: ["array", "paragraph"]}
        }, r.description = {
            name: "Caption",
            remarks: ["Container element for the textual description that is associated with a Figure, Table, Video node etc.", "This is the title for the figure or the description of the figure that prints or displays with the figure."],
            properties: {title: "Caption title (optional)", children: "0..n Paragraph nodes"}
        }, r.example = {id: "caption_1", children: ["paragraph_1", "paragraph_2"]}, (r.Prototype = function () {
            this.getChildrenIds = function () {
                return this.properties.children || []
            }, this.hasTitle = function () {
                return !!this.properties.title
            }, this.getTitle = function () {
                if (this.properties.title) return this.document.get(this.properties.title)
            }
        }).prototype = o.Composite.prototype, r.prototype = new r.Prototype, o.Node.defineProperties(r.prototype.constructor = r), e.exports = r
    }, {"../../../substance/document": 173}],
    20: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.call(this, t, e)
        }

        var o = t("../composite").View, i = t("../../../substance/application").$$;
        (r.Prototype = function () {
            this.render = function () {
                var t;
                return this.content = i("div.content"), this.node.getTitle() && ((t = this.createChildView(this.node.title).render().el).classList.add("caption-title"), this.content.appendChild(t)), this.renderChildren(), this.el.appendChild(this.content), this
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"../../../substance/application": 160, "../composite": 33}],
    21: [function (t, e, n) {
        "use strict";
        e.exports = {Model: t("./caption"), View: t("./caption_view")}
    }, {"./caption": 19, "./caption_view": 20}],
    22: [function (t, e, n) {
        function r(t, e) {
            i.Node.call(this, t, e)
        }

        var o = t("underscore"), i = t("../../../substance/document");
        r.type = {
            id: "article_citation",
            parent: "content",
            properties: {
                source_id: "string",
                title: "string",
                label: "string",
                authors: ["array", "string"],
                doi: "string",
                source: "string",
                volume: "string",
                citation_type: "string",
                publisher_name: "string",
                publisher_location: "string",
                fpage: "string",
                lpage: "string",
                year: "string",
                comment: "string",
                citation_urls: ["array", "object"],
                source_formats: ["array", "object"]
            }
        }, r.description = {
            name: "Citation",
            remarks: ["A journal citation.", "This element can be used to describe all kinds of citations."],
            properties: {
                title: "The article's title",
                label: "Optional label (could be a number for instance)",
                doi: "DOI reference",
                source: "Usually the journal name",
                volume: "Issue number",
                citation_type: "Citation Type",
                publisher_name: "Publisher Name",
                publisher_location: "Publisher Location",
                fpage: "First page",
                lpage: "Last page",
                year: "The year of publication",
                comment: "Author comment.",
                citation_urls: "A list of links for accessing the article on the web"
            }
        }, r.example = {
            id: "article_nature08160",
            type: "article_citation",
            label: "5",
            title: "The genome of the blood fluke Schistosoma mansoni",
            authors: ["M Berriman", "BJ Haas", "PT LoVerde"],
            citation_type: "Journal Article",
            doi: "http://dx.doi.org/10.1038/nature08160",
            source: "Nature",
            volume: "460",
            fpage: "352",
            lpage: "8",
            year: "1984",
            comment: "This is a comment.",
            citation_urls: [{name: "PubMed", url: "http://www.ncbi.nlm.nih.gov/pubmed/19606141"}]
        }, (r.Prototype = function () {
            this.urls = function () {
                return 0 < this.properties.citation_urls.length ? this.properties.citation_urls : [this.properties.doi]
            }, this.getHeader = function () {
                return o.compact([this.properties.label, this.properties.citation_type || "Reference"]).join(" - ")
            }
        }).prototype = i.Node.prototype, r.prototype = new r.Prototype, i.Node.defineProperties(r.prototype.constructor = r), e.exports = r
    }, {"../../../substance/document": 173, underscore: 130}],
    23: [function (t, e, n) {
        "use strict";

        function r(t, e, n) {
            o.apply(this, arguments), i.call(this, n)
        }

        var c = t("underscore"), u = t("../../../substance/application").$$, o = t("../node").View,
            i = t("../../resource_view");
        (r.Prototype = function () {
            c.extend(this, i.prototype), this.renderBody = function () {
                var e, t = document.createDocumentFragment(), n = this.node,
                    r = this.createTextPropertyView([n.id, "title"], {classes: "title"}),
                    r = (t.appendChild(r.render().el), t.appendChild(u(".authors", {html: n.authors.join(", ")})), ""),
                    o = "", i = "", s = "",
                    a = (n.source && "" === n.volume ? o = n.source : n.source && n.volume && (o = [n.source, n.volume].join(", ")), n.fpage && n.lpage && (i = [n.fpage, n.lpage].join("-")), []);
                n.publisher_name && n.publisher_location && (a.push(n.publisher_name), a.push(n.publisher_location)), n.year && a.push(n.year), s = a.join(", "), (r = o) && (i || s) && (r += ": "), i && s ? r += [i, s].join(", ") : r = r + i + s, t.appendChild(u(".source", {html: r})), n.comment && (a = this.createTextView({
                    path: [n.id, "comment"],
                    classes: "comment"
                }), t.appendChild(a.render().el)), n.doi && t.appendChild(u(".doi", {
                    children: [u("b", {text: "DOI: "}), u("a", {
                        href: n.doi,
                        target: "_new",
                        text: n.doi
                    })]
                })), 0 < n.citation_urls.length && (e = u(".citation-urls"), c.each(n.citation_urls, function (t) {
                    e.appendChild(u("a.url", {href: t.url, text: t.name, target: "_blank"}))
                }), t.appendChild(e)), this.content.appendChild(t)
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r.prototype.constructor = r
    }, {"../../../substance/application": 160, "../../resource_view": 126, "../node": 91, underscore: 130}],
    24: [function (t, e, n) {
        "use strict";
        e.exports = {Model: t("./citation"), View: t("./citation_view")}
    }, {"./citation": 22, "./citation_view": 23}],
    25: [function (t, e, n) {
        function r(t, e) {
            s.call(this, t, e)
        }

        var o = t("../../../substance/document"), i = t("../annotation/annotation"),
            s = t("../resource_reference/resource_reference");
        r.type = {
            id: "citation_reference",
            parent: "resource_reference",
            properties: {target: "citation"}
        }, (r.Prototype = function () {
        }).prototype = s.prototype, ((r.prototype = new r.Prototype).constructor = r).fragmentation = i.NEVER, o.Node.defineProperties(r), e.exports = r
    }, {
        "../../../substance/document": 173,
        "../annotation/annotation": 8,
        "../resource_reference/resource_reference": 104
    }],
    26: [function (t, e, n) {
        e.exports = {Model: t("./citation_reference.js"), View: t("../resource_reference/resource_reference_view.js")}
    }, {"../resource_reference/resource_reference_view.js": 105, "./citation_reference.js": 25}],
    27: [function (t, e, n) {
        function r(t, e) {
            o.call(this, t, e)
        }

        var o = t("../annotation/annotation");
        r.type = {id: "underline", parent: "annotation", properties: {}}, (r.Prototype = function () {
        }).prototype = o.prototype, ((r.prototype = new r.Prototype).constructor = r).fragmentation = o.DONT_CARE, e.exports = r
    }, {"../annotation/annotation": 8}],
    28: [function (t, e, n) {
        e.exports = {Model: t("./code.js"), View: t("../annotation/annotation_view.js")}
    }, {"../annotation/annotation_view.js": 9, "./code.js": 27}],
    29: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.call(this, t, e)
        }

        var o = t("../text").Model;
        r.type = {
            id: "codeblock",
            parent: "content",
            properties: {source_id: "string", content: "string"}
        }, r.config = {zoomable: !0}, r.description = {
            name: "Codeblock",
            remarks: ["Text in a codeblock is displayed in a fixed-width font, and it preserves both spaces and line breaks"],
            properties: {content: "Content"}
        }, r.example = {
            type: "codeblock",
            id: "codeblock_1",
            content: 'var text = "Sun";\nvar op1 = null;\ntext = op2.apply(op1.apply(text));\nconsole.log(text);'
        }, (r.Prototype = function () {
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r.prototype.constructor = r
    }, {"../text": 115}],
    30: [function (t, e, n) {
        "use strict";

        function r(t) {
            o.call(this, t)
        }

        var o = t("../text/text_view");
        (r.Prototype = function () {
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"../text/text_view": 118}],
    31: [function (t, e, n) {
        "use strict";
        e.exports = {Model: t("./codeblock"), View: t("./codeblock_view")}
    }, {"./codeblock": 29, "./codeblock_view": 30}],
    32: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.call(this, t, e), this.childrenViews = []
        }

        var o = t("../node").View;
        (r.Prototype = function () {
            this.render = function () {
                return o.prototype.render.call(this), this.renderChildren(), this
            }, this.renderChildren = function () {
                for (var t = this.node.getChildrenIds(), e = 0; e < t.length; e++) {
                    var n = this.createChildView(t[e]).render().el;
                    this.content.appendChild(n)
                }
            }, this.dispose = function () {
                o.prototype.dispose.call(this);
                for (var t = 0; t < this.childrenViews.length; t++) this.childrenViews[t].dispose()
            }, this.delete = function () {
            }, this.getCharPosition = function () {
                return 0
            }, this.getDOMPosition = function () {
                var t = this.$(".content")[0], e = document.createRange();
                return e.setStartBefore(t.childNodes[0]), e
            }, this.createChildView = function (t) {
                t = this.createView(t);
                return this.childrenViews.push(t), t
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"../node": 91}],
    33: [function (t, e, n) {
        "use strict";
        var r = t("../../../substance/document");
        e.exports = {Model: r.Composite, View: t("./composite_view")}
    }, {"../../../substance/document": 173, "./composite_view": 32}],
    34: [function (t, e, n) {
        function r(t, e) {
            i.Node.call(this, t, e)
        }

        var o = t("underscore"), i = t("../../../substance/document");
        r.type = {
            id: "contributor",
            parent: "content",
            properties: {
                source_id: "string",
                name: "string",
                role: "string",
                contributor_type: "string",
                affiliations: ["array", "affiliation"],
                present_address: ["string"],
                fundings: ["array", "string"],
                image: "string",
                emails: ["array", "string"],
                contribution: "string",
                bio: ["array", "paragraph"],
                deceased: "boolean",
                members: ["array", "string"],
                orcid: "string",
                equal_contrib: ["array", "string"],
                competing_interests: ["array", "string"]
            }
        }, r.description = {
            name: "Contributor",
            remarks: ["A contributor entity."],
            properties: {
                name: "Full name",
                affiliations: "A list of affiliation ids",
                present_address: "Present address of the contributor",
                role: "Role of contributor (e.g. Author, Editor)",
                fundings: "A list of funding descriptions",
                deceased: !1,
                emails: "A list of emails",
                orcid: "ORCID",
                contribution: "Description of contribution",
                equal_contrib: "A list of people who contributed equally",
                competing_interests: "A list of conflicts",
                members: "a list of group members"
            }
        }, r.example = {
            id: "person_1",
            type: "contributor",
            name: "John Doe",
            affiliations: ["affiliation_1", "affiliation_2"],
            role: "Author",
            fundings: ["Funding Organisation 1"],
            emails: ["a@b.com"],
            contribution: "Revising the article, data cleanup",
            equal_contrib: ["John Doe", "Jane Doe"]
        }, (r.Prototype = function () {
            this.getAffiliations = function () {
                return o.map(this.properties.affiliations, function (t) {
                    return this.document.get(t)
                }, this)
            }, this.getHeader = function () {
                return this.properties.contributor_type || "Author"
            }
        }).prototype = i.Node.prototype, r.prototype = new r.Prototype, i.Node.defineProperties(r.prototype.constructor = r), e.exports = r
    }, {"../../../substance/document": 173, underscore: 130}],
    35: [function (t, e, n) {
        "use strict";

        function r(t, e, n) {
            i.call(this, t, e), a.call(this, n)
        }

        var o = t("underscore"), i = t("../node").View, s = t("../../../substance/application").$$,
            a = t("../../resource_view");
        (r.Prototype = function () {
            o.extend(this, a.prototype), this.renderBody = function () {
                var e, t;
                this.content.appendChild(s(".contributor-name", {text: this.node.name})), this.node.role && this.content.appendChild(s(".role", {text: this.node.role})), this.content.appendChild(s(".affiliations", {
                    children: o.map(this.node.getAffiliations(), function (t) {
                        t = o.compact([t.department, t.institution, t.city, t.country]).join(", ");
                        return s(".affiliation", {text: t})
                    })
                })), this.node.present_address && this.content.appendChild(s(".present-address.contrib-data", {children: [s("span.contrib-label", {text: "Present address: "}), s("span", {text: this.node.present_address})]})), this.node.contribution && this.content.appendChild(s(".contribution.contrib-data", {children: [s("span.contrib-label", {text: "Contribution: "}), s("span", {text: this.node.contribution})]})), this.node.equal_contrib && 0 < this.node.equal_contrib.length && this.content.appendChild(s(".equal-contribution.contrib-data", {children: [s("span.contrib-label", {text: "Contributed equally with: "}), s("span", {text: this.node.equal_contrib.join(", ")})]})), 0 < this.node.emails.length && this.content.appendChild(s(".emails.contrib-data", {
                    children: [s("span.contrib-label", {text: "For correspondence: "}), s("span", {
                        children: o.map(this.node.emails, function (t) {
                            return s("a", {href: "mailto:" + t, text: t + " "})
                        })
                    })]
                })), 0 < this.node.fundings.length && this.content.appendChild(s(".fundings.contrib-data", {children: [s("span.contrib-label", {text: "Funding: "}), s("span", {text: this.node.fundings.join("; ")})]})), this.node.competing_interests.length && this.content.appendChild(s(".competing-interests.contrib-data", {children: [s("span.contrib-label", {text: "Competing Interests: "}), s("span", {text: this.node.competing_interests.join(", ")})]})), this.node.orcid && this.content.appendChild(s(".contrib-data", {
                    children: [s("span.contrib-label", {text: "ORCID: "}), s("a.orcid", {
                        href: this.node.orcid,
                        text: this.node.orcid
                    })]
                })), 0 < this.node.members.length && this.content.appendChild(s(".group-members.contrib-data", {children: [s("span.contrib-label", {text: "Group Members: "}), s("span", {text: this.node.members.join(", ")})]})), (this.node.image || this.node.bio && 0 < this.node.bio.length) && (e = s(".bio"), t = [s("img", {src: this.node.image}), e], o.each(this.node.bio, function (t) {
                    e.appendChild(this.createView(t).render().el)
                }, this), this.content.appendChild(s(".contributor-bio.container", {children: t}))), this.node.deceased && this.content.appendChild(s(".label", {text: "* Deceased"}))
            }
        }).prototype = i.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"../../../substance/application": 160, "../../resource_view": 126, "../node": 91, underscore: 130}],
    36: [function (t, e, n) {
        "use strict";
        e.exports = {Model: t("./contributor"), View: t("./contributor_view")}
    }, {"./contributor": 34, "./contributor_view": 35}],
    37: [function (t, e, n) {
        function r(t, e) {
            s.call(this, t, e)
        }

        var o = t("../../../substance/document"), i = t("../annotation/annotation"),
            s = t("../resource_reference/resource_reference");
        r.type = {
            id: "contributor_reference",
            parent: "resource_reference",
            properties: {target: "contributor"}
        }, (r.Prototype = function () {
        }).prototype = s.prototype, ((r.prototype = new r.Prototype).constructor = r).fragmentation = i.NEVER, o.Node.defineProperties(r), e.exports = r
    }, {
        "../../../substance/document": 173,
        "../annotation/annotation": 8,
        "../resource_reference/resource_reference": 104
    }],
    38: [function (t, e, n) {
        e.exports = {
            Model: t("./contributor_reference.js"),
            View: t("../resource_reference/resource_reference_view.js")
        }
    }, {"../resource_reference/resource_reference_view.js": 105, "./contributor_reference.js": 37}],
    39: [function (t, e, n) {
        function r(t, e) {
            i.Node.call(this, t, e)
        }

        var o = t("underscore"), i = t("../../../substance/document");
        r.type = {
            id: "cover",
            parent: "content",
            properties: {
                source_id: "string",
                authors: ["array", "paragraph"],
                breadcrumbs: "object",
                abstract: "object"
            }
        }, r.description = {
            name: "Cover",
            remarks: ["Virtual view on the title and authors of the paper."],
            properties: {authors: "A paragraph that has the authors names plus references to the person cards"}
        }, r.example = {id: "cover", type: "cover"}, (r.Prototype = function () {
            this.getAuthors = function () {
                return o.map(this.properties.authors, function (t) {
                    return this.document.get(t)
                }, this)
            }, this.getTitle = function () {
                return this.document.title
            }, this.getAbstract = function () {
                return this.document.get(this.properties.abstract)
            }
        }).prototype = i.Node.prototype, r.prototype = new r.Prototype, i.Node.defineProperties(r.prototype.constructor = r), e.exports = r
    }, {"../../../substance/document": 173, underscore: 130}],
    40: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            a.call(this, t, e)
        }

        var s = t("underscore"), a = t("../node").View, c = t("../../../substance/application").$$,
            u = t("../../article_util");
        (r.Prototype = function () {
            this.render = function () {
                a.prototype.render.call(this);
                var n, t, e, r = this.node, o = this.node.document.get("publication_info"),
                    i = (!o || (i = o.subjects) && (i = o.subject_link ? c(".subjects", {
                        children: s.map(o.getSubjectLinks(), function (t) {
                            return c("a", {href: t.url, text: t.name})
                        })
                    }) : c(".subjects", {html: i.join(" ")}), this.content.appendChild(i)), this.createTextPropertyView(["document", "title"], {
                        classes: "title",
                        elementType: "div"
                    })), i = (this.content.appendChild(i.render().el), c(".authors", {
                        children: s.map(r.getAuthors(), function (t) {
                            t = this.viewFactory.createView(t).render().el;
                            return this.content.appendChild(t), t
                        }, this)
                    }));
                return i.appendChild(c(".content-node.text.plain", {children: [c(".content", {text: this.node.document.on_behalf_of})]})), this.content.appendChild(i), o && (i = o.published_on, e = o.article_type, i && (i = [u.formatDate(i)], e && (o.article_type_link ? (t = o.getArticleTypeLink(), i.unshift('<a href="' + t.url + '">' + t.name + "</a>")) : i.unshift(e)), this.content.appendChild(c(".published-on", {html: i.join(" ")})))), o && 0 < o.links.length && (n = c(".links"), s.each(o.links, function (t) {
                    var e;
                    "json" === t.type && "" === t.url ? (e = JSON.stringify(this.node.document.toJSON(), null, "  "), e = new Blob([e], {type: "application/json"}), n.appendChild(c("a.json", {
                        href: window.URL ? window.URL.createObjectURL(e) : "#",
                        html: '<i class="fa fa-external-link-square"></i> ' + t.name,
                        target: "_blank"
                    }))) : n.appendChild(c("a." + t.type, {
                        href: t.url,
                        html: '<i class="fa fa-external-link-square"></i> ' + t.name,
                        target: "_blank"
                    }))
                }, this), this.content.appendChild(n)), o && (t = o.doi) && this.content.appendChild(c(".doi", {html: 'DOI: <a href="https://doi.org/' + t + '">' + t + "</a>"})), r.getAbstract() && (e = this.viewFactory.createView(r.getAbstract()).render().el, this.content.appendChild(e)), this
            }
        }).prototype = a.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"../../../substance/application": 160, "../../article_util": 4, "../node": 91, underscore: 130}],
    41: [function (t, e, n) {
        "use strict";
        e.exports = {Model: t("./cover"), View: t("./cover_view")}
    }, {"./cover": 39, "./cover_view": 40}],
    42: [function (t, e, n) {
        function r(t, e) {
            i.call(this, t, e)
        }

        var o = t("../../../substance/document"), i = t("../annotation/annotation");
        r.type = {
            id: "cross_reference",
            parent: "resource_reference",
            properties: {target: "toc"}
        }, (r.Prototype = function () {
        }).prototype = i.prototype, ((r.prototype = new r.Prototype).constructor = r).fragmentation = i.NEVER, o.Node.defineProperties(r), e.exports = r
    }, {"../../../substance/document": 173, "../annotation/annotation": 8}],
    43: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.call(this, t, e), this.$el.addClass("cross-reference")
        }

        var o = t("../annotation/annotation_view");
        (r.Prototype = function () {
            this.createElement = function () {
                var t = document.createElement("a");
                return t.setAttribute("href", ""), t
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"../annotation/annotation_view": 9}],
    44: [function (t, e, n) {
        e.exports = {Model: t("./cross_reference.js"), View: t("./cross_reference_view.js")}
    }, {"./cross_reference.js": 42, "./cross_reference_view.js": 43}],
    45: [function (t, e, n) {
        function r(t, e) {
            i.call(this, t, e)
        }

        var o = t("../../../substance/document"), i = t("../annotation/annotation");
        r.type = {
            id: "custom_annotation",
            parent: "annotation",
            properties: {name: "string"}
        }, (r.Prototype = function () {
        }).prototype = i.prototype, ((r.prototype = new r.Prototype).constructor = r).fragmentation = i.DONT_CARE, o.Node.defineProperties(r), e.exports = r
    }, {"../../../substance/document": 173, "../annotation/annotation": 8}],
    46: [function (t, e, n) {
        function r(t) {
            o.call(this, t)
        }

        var o = t("../annotation").View;
        (r.Prototype = function () {
            this.setClasses = function () {
                o.prototype.setClasses.call(this), this.$el.addClass(this.node.name)
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"../annotation": 10}],
    47: [function (t, e, n) {
        e.exports = {Model: t("./custom_annotation.js"), View: t("./custom_annotation_view.js")}
    }, {"./custom_annotation.js": 45, "./custom_annotation_view.js": 46}],
    48: [function (t, e, n) {
        function r(t) {
            o.Node.call(this, t)
        }

        var o = t("../../../substance/document");
        r.type = {
            id: "definition",
            parent: "content",
            properties: {source_id: "string", title: "string", description: "string"}
        }, r.description = {
            name: "Definition",
            remarks: ["A journal citation.", "This element can be used to describe all kinds of citations."],
            properties: {title: "The article's title", description: "Definition description"}
        }, r.example = {
            id: "definition_def1",
            type: "Definition",
            title: "IAP",
            description: "Integrated Analysis Platform"
        }, (r.Prototype = function () {
            this.urls = function () {
                return 0 < this.properties.citation_urls.length ? this.properties.citation_urls : [this.properties.doi]
            }, this.getHeader = function () {
                return this.properties.label ? [this.properties.label, this.properties.title].join(". ") : this.properties.title
            }
        }).prototype = o.Node.prototype, r.prototype = new r.Prototype, o.Node.defineProperties(r.prototype.constructor = r), e.exports = r
    }, {"../../../substance/document": 173}],
    49: [function (t, e, n) {
        "use strict";

        function r(t, e, n) {
            i.call(this, t, e), a.call(this, n)
        }

        var o = t("underscore"), i = t("../node").View, s = t("../../../substance/application").$$,
            a = t("../../resource_view");
        (r.Prototype = function () {
            o.extend(this, a.prototype), this.renderBody = function () {
                this.content.appendChild(s(".description", {text: this.node.description}))
            }
        }).prototype = i.prototype, r.prototype = new r.Prototype, e.exports = r.prototype.constructor = r
    }, {"../../../substance/application": 160, "../../resource_view": 126, "../node": 91, underscore: 130}],
    50: [function (t, e, n) {
        "use strict";
        e.exports = {Model: t("./definition"), View: t("./definition_view")}
    }, {"./definition": 48, "./definition_view": 49}],
    51: [function (t, e, n) {
        function r(t, e) {
            s.call(this, t, e)
        }

        var o = t("../../../substance/document"), i = t("../annotation/annotation"),
            s = t("../resource_reference/resource_reference");
        r.type = {
            id: "definition_reference",
            parent: "resource_reference",
            properties: {target: "definition"}
        }, (r.Prototype = function () {
        }).prototype = s.prototype, ((r.prototype = new r.Prototype).constructor = r).fragmentation = i.NEVER, o.Node.defineProperties(r), e.exports = r
    }, {
        "../../../substance/document": 173,
        "../annotation/annotation": 8,
        "../resource_reference/resource_reference": 104
    }],
    52: [function (t, e, n) {
        e.exports = {Model: t("./definition_reference.js"), View: t("../resource_reference/resource_reference_view.js")}
    }, {"../resource_reference/resource_reference_view.js": 105, "./definition_reference.js": 51}],
    53: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.Node.call(this, t, e)
        }

        var o = t("../../../substance/document");
        r.type = {
            id: "document",
            parent: "content",
            properties: {
                views: ["array", "view"],
                guid: "string",
                creator: "string",
                title: "string",
                authors: ["array", "contributor"],
                on_behalf_of: "string",
                abstract: "string"
            }
        }, (r.Prototype = function () {
        }).prototype = o.Node.prototype, r.prototype = new r.Prototype, o.Node.defineProperties(r.prototype.constructor = r), e.exports = r
    }, {"../../../substance/document": 173}],
    54: [function (t, e, n) {
        "use strict";
        e.exports = {Model: t("./document_node")}
    }, {"./document_node": 53}],
    55: [function (t, e, n) {
        function r(t, e) {
            o.call(this, t, e)
        }

        var o = t("../annotation/annotation");
        r.type = {id: "emphasis", parent: "annotation", properties: {}}, (r.Prototype = function () {
        }).prototype = o.prototype, ((r.prototype = new r.Prototype).constructor = r).fragmentation = o.DONT_CARE, e.exports = r
    }, {"../annotation/annotation": 8}],
    56: [function (t, e, n) {
        e.exports = {Model: t("./emphasis.js"), View: t("../annotation/annotation_view.js")}
    }, {"../annotation/annotation_view.js": 9, "./emphasis.js": 55}],
    57: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.Composite.call(this, t, e)
        }

        var o = t("../../../substance/document");
        r.type = {
            parent: "content",
            properties: {
                source_id: "string",
                label: "string",
                url: "string",
                caption: "caption",
                position: "string",
                attrib: "string"
            }
        }, r.config = {zoomable: !0}, r.description = {
            name: "Figure",
            remarks: ["A figure is a figure is figure."],
            properties: {
                label: "Label used as header for the figure cards",
                url: "Image url",
                caption: "A reference to a caption node that describes the figure",
                attrib: "Figure attribution"
            }
        }, r.example = {
            id: "figure_1",
            label: "Figure 1",
            url: "http://example.com/fig1.png",
            caption: "caption_1"
        }, (r.Prototype = function () {
            this.hasCaption = function () {
                return !!this.properties.caption
            }, this.getChildrenIds = function () {
                var t = [];
                return this.properties.caption && t.push(this.properties.caption), t
            }, this.getCaption = function () {
                if (this.properties.caption) return this.document.get(this.properties.caption)
            }, this.getHeader = function () {
                return this.properties.label
            }, this.includeInToc = function () {
                return !0
            }
        }).prototype = o.Composite.prototype, r.prototype = new r.Prototype, o.Node.defineProperties((r.prototype.constructor = r).prototype, Object.keys(r.type.properties)), e.exports = r
    }, {"../../../substance/document": 173}],
    58: [function (t, e, n) {
        "use strict";

        function r(t, e, n) {
            i.call(this, t, e), a.call(this, n)
        }

        var o = t("underscore"), i = t("../composite").View, s = t("../../../substance/application").$$,
            a = t("../../resource_view");
        (r.Prototype = function () {
            o.extend(this, a.prototype), this.isZoomable = !0, this.renderBody = function () {
                var t;
                this.content.appendChild(s(".label", {text: this.node.label})), this.node.url && (t = s(".image-wrapper", {
                    children: [s("a", {
                        href: this.node.url,
                        target: "_blank",
                        class: "toggle toggle-fullscreen",
                        children: [s("img", {src: this.node.url})]
                    })]
                }), this.content.appendChild(t)), this.renderChildren(), this.node.attrib && this.content.appendChild(s(".figure-attribution", {text: this.node.attrib}))
            }, this.renderLabel = function () {
                var t = s(".name", {href: "#"});
                return this.renderAnnotatedText([this.node.id, "label"], t), t
            }
        }).prototype = i.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"../../../substance/application": 160, "../../resource_view": 126, "../composite": 33, underscore: 130}],
    59: [function (t, e, n) {
        "use strict";
        e.exports = {Model: t("./figure"), View: t("./figure_view")}
    }, {"./figure": 57, "./figure_view": 58}],
    60: [function (t, e, n) {
        function r(t, e) {
            s.call(this, t, e)
        }

        var o = t("../../../substance/document"), i = t("../annotation/annotation"),
            s = t("../resource_reference/resource_reference");
        r.type = {
            id: "figure_reference",
            parent: "resource_reference",
            properties: {target: "figure"}
        }, (r.Prototype = function () {
        }).prototype = s.prototype, ((r.prototype = new r.Prototype).constructor = r).fragmentation = i.NEVER, o.Node.defineProperties(r), e.exports = r
    }, {
        "../../../substance/document": 173,
        "../annotation/annotation": 8,
        "../resource_reference/resource_reference": 104
    }],
    61: [function (t, e, n) {
        e.exports = {Model: t("./figure_reference.js"), View: t("../resource_reference/resource_reference_view.js")}
    }, {"../resource_reference/resource_reference_view.js": 105, "./figure_reference.js": 60}],
    62: [function (t, e, n) {
        function r(t, e) {
            i.Node.call(this, t, e)
        }

        var o = t("underscore"), i = t("../../../substance/document");
        r.type = {
            id: "article_footnote",
            parent: "content",
            properties: {
                source_id: "string",
                text: ["array", "paragraph"],
                label: "string",
                authors: ["array", "string"],
                doi: "string",
                source: "string",
                volume: "string",
                citation_type: "string",
                publisher_name: "string",
                publisher_location: "string",
                fpage: "string",
                lpage: "string",
                year: "string",
                comment: "string",
                citation_urls: ["array", "object"],
                source_formats: ["array", "object"]
            }
        }, r.description = {
            name: "Footnote",
            remarks: ["A journal citation.", "This element can be used to describe all kinds of citations."],
            properties: {
                title: "The article's title",
                label: "Optional label (could be a number for instance)",
                doi: "DOI reference",
                source: "Usually the journal name",
                volume: "Issue number",
                citation_type: "Footnote Type",
                publisher_name: "Publisher Name",
                publisher_location: "Publisher Location",
                fpage: "First page",
                lpage: "Last page",
                year: "The year of publication",
                comment: "Author comment.",
                citation_urls: "A list of links for accessing the article on the web"
            }
        }, r.example = {
            id: "article_nature08160",
            type: "article_citation",
            label: "5",
            title: "The genome of the blood fluke Schistosoma mansoni",
            authors: ["M Berriman", "BJ Haas", "PT LoVerde"],
            citation_type: "Journal Article",
            doi: "http://dx.doi.org/10.1038/nature08160",
            source: "Nature",
            volume: "460",
            fpage: "352",
            lpage: "8",
            year: "1984",
            comment: "This is a comment.",
            citation_urls: [{name: "PubMed", url: "http://www.ncbi.nlm.nih.gov/pubmed/19606141"}]
        }, (r.Prototype = function () {
            this.urls = function () {
                return 0 < this.properties.citation_urls.length ? this.properties.citation_urls : [this.properties.doi]
            }, this.getHeader = function () {
                return o.compact([this.properties.label, this.properties.citation_type || locales.Reference]).join(" - ")
            }
        }).prototype = i.Node.prototype, r.prototype = new r.Prototype, i.Node.defineProperties(r.prototype.constructor = r), e.exports = r
    }, {"../../../substance/document": 173, underscore: 130}],
    63: [function (t, e, n) {
        "use strict";

        function r(t, e, n) {
            o.apply(this, arguments), i.call(this, n)
        }

        var w = t("underscore"), _ = t("../../../substance/application").$$, o = t("../node").View,
            i = t("../../resource_view"), x = t("../../../substance/util");
        (r.Prototype = function () {
            w.extend(this, i.prototype), this.renderBody = function () {
                var t, e, n, r = document.createDocumentFragment(), o = this.node, i = o.properties.text;

                function s(t, e, n) {
                    e = document.createElement(e);
                    return e.className = n, e.innerHTML = t.textContent, void 0 !== t.target && e.setAttribute("data-id", t.target), e
                }

                for (t = 0; t < i.length; t++) for (var a = i[t], c = 0; c < a.length; c++) {
                    var u = a[c];
                    if (void 0 !== u) {
                        var l, p, h, d = document.createElement("div");
                        if ("paragraph" === u.handler) for (u = u.nodes, e = 0; e < u.length; e++) "italic" == u[e].tagName ? d.appendChild(s(u[e], "span", "citation-italic")) : "xref" == u[e].tagName && "sec" === u[e].getAttribute("ref-type") ? d.appendChild(s(u[e], "a", "annotation cross_reference cross-reference")) : "xref" == u[e].tagName && "bibr" === u[e].getAttribute("ref-type") ? ((n = s(u[e], "a", "")).setAttribute("href", "#citations/" + u[e].target), d.appendChild(n)) : "ext-link" == u[e].tagName ? ((n = s(u[e], "a", "content-node link")).setAttribute("href", u[e]), n.setAttribute("target", "_blank"), (h = u[e].getAttributeNodeNS("http://www.w3.org/1999/xlink", "href")) && (n.innerHTML = u[e].textContent, n.setAttribute("href", h.textContent)), d.appendChild(n)) : d.appendChild(u[e]); else "tableWrap" !== u.handler || (l = x.dom.getChildren(u.node))[0] && ((p = document.createElement("table")).innerHTML = l[0].innerHTML, p.className = "table", r.appendChild(p));
                        r.appendChild(d)
                    }
                }
                r.appendChild(_(".authors", {html: o.authors.join(", ")}));
                var f, g = "", y = "", m = "", v = "",
                    b = (o.source && "" === o.volume ? y = o.source : o.source && o.volume && (y = [o.source, o.volume].join(", ")), o.fpage && o.lpage && (m = [o.fpage, o.lpage].join("-")), []);
                o.publisher_name && o.publisher_location && (b.push(o.publisher_name), b.push(o.publisher_location)), o.year && b.push(o.year), v = b.join(", "), (g = y) && (m || v) && (g += ": "), m && v ? g += [m, v].join(", ") : g = g + m + v, r.appendChild(_(".source", {html: g})), o.comment && (b = this.createTextView({
                    path: [o.id, "comment"],
                    classes: "comment"
                }), r.appendChild(b.render().el)), o.doi && r.appendChild(_(".doi", {
                    children: [_("b", {text: "DOI: "}), _("a", {
                        href: o.doi,
                        target: "_new",
                        text: o.doi
                    })]
                })), 0 < o.citation_urls.length && (f = _(".citation-urls"), w.each(o.citation_urls, function (t) {
                    f.appendChild(_("a.url", {href: t.url, text: t.name, target: "_blank"}))
                }), r.appendChild(f)), this.content.appendChild(r)
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r.prototype.constructor = r
    }, {
        "../../../substance/application": 160,
        "../../../substance/util": 182,
        "../../resource_view": 126,
        "../node": 91,
        underscore: 130
    }],
    64: [function (t, e, n) {
        "use strict";
        e.exports = {Model: t("./footnote"), View: t("./footnote_view")}
    }, {"./footnote": 62, "./footnote_view": 63}],
    65: [function (t, e, n) {
        function r(t, e) {
            s.call(this, t, e)
        }

        var o = t("../../../substance/document"), i = t("../annotation/annotation"),
            s = t("../resource_reference/resource_reference");
        r.type = {
            id: "footnote_reference",
            parent: "resource_reference",
            properties: {target: "footnote"}
        }, (r.Prototype = function () {
        }).prototype = s.prototype, ((r.prototype = new r.Prototype).constructor = r).fragmentation = i.NEVER, o.Node.defineProperties(r), e.exports = r
    }, {
        "../../../substance/document": 173,
        "../annotation/annotation": 8,
        "../resource_reference/resource_reference": 104
    }],
    66: [function (t, e, n) {
        e.exports = {Model: t("./footnote_reference.js"), View: t("../resource_reference/resource_reference_view.js")}
    }, {"../resource_reference/resource_reference_view.js": 105, "./footnote_reference.js": 65}],
    67: [function (t, e, n) {
        function r(t) {
            o.Node.call(this, t)
        }

        var o = t("../../../substance/document");
        r.type = {
            id: "formula",
            parent: "content",
            properties: {
                source_id: "string",
                inline: "boolean",
                label: "string",
                format: ["array", "string"],
                data: ["array", "string"]
            }
        }, r.description = {
            name: "Formula",
            remarks: ["Can either be expressed in MathML format or using an image url"],
            properties: {
                label: "Formula label (4)",
                data: "Formula data, either MathML or image url",
                format: "Can either be `mathml` or `image`"
            }
        }, r.example = {
            type: "formula",
            id: "formula_eqn1",
            label: "(1)",
            content: "<mml:mrow>...</mml:mrow>",
            format: "mathml"
        }, (r.Prototype = function () {
            this.inline = !1
        }).prototype = o.Node.prototype, r.prototype = new r.Prototype, o.Node.defineProperties(r.prototype.constuctor = r), e.exports = r
    }, {"../../../substance/document": 173}],
    68: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.call(this, t, e)
        }

        var o = t("../node").View;
        (r.Prototype = function () {
            var a = {latex: "math/tex", mathml: "math/mml"}, c = {image: 0, mathml: 1, latex: 2};
            this.render = function () {
                this.node.inline && this.$el.addClass("inline");
                var t = [];
                for (r = 0; r < this.node.data.length; r++) t.push({
                    format: this.node.format[r],
                    data: this.node.data[r]
                });
                if (t.sort(function (t, e) {
                    return c[t.format] - c[e.format]
                }), 0 < t.length) for (var e = !1, n = !1, r = 0; r < t.length; r++) {
                    var o, i = t[r].format, s = t[r].data;
                    switch (i) {
                        case"mathml":
                            n || (this.$el.append($(s)), n = !0, e && (this.$preview.hide(), e = !0));
                            break;
                        case"latex":
                            n || (o = a[i], this.node.inline || (o += "; mode=display"), o = $("<script>").attr("type", o).html(s), this.$el.append(o), n = !0);
                            break;
                        case"image":
                            e || ((o = $("<div>").addClass("MathJax_Preview")).append($("<img>").attr("src", s)), this.$el.append(o), this.$preview = o, e = !0);
                            break;
                        default:
                            console.error("Unknown formula format:", i)
                    }
                }
                return this.node.label && this.$el.append($('<div class="label">').html(this.node.label)), this
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"../node": 91}],
    69: [function (t, e, n) {
        "use strict";
        e.exports = {Model: t("./formula"), View: t("./formula_view")}
    }, {"./formula": 67, "./formula_view": 68}],
    70: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            i.call(this, t, e)
        }

        var o = t("../../../substance/document").Node, i = t("../text/text_node");
        r.type = {
            id: "heading",
            parent: "content",
            properties: {
                source_id: "string",
                content: "string",
                label: "string",
                level: "number",
                authors: ["array", "string"]
            }
        }, r.example = {
            type: "heading",
            id: "heading_1",
            content: "Introduction",
            level: 1
        }, r.description = {
            name: "Heading",
            remarks: ["Denotes a section or sub section in your article."],
            properties: {content: "Heading title", label: "Heading label", level: "Heading level. Ranges from 1..4"}
        }, (r.Prototype = function () {
            this.splitInto = "paragraph", this.includeInToc = function () {
                return !0
            }, this.getLevel = function () {
                return this.level
            }
        }).prototype = i.prototype, r.prototype = new r.Prototype, o.defineProperties(r.prototype.constructor = r), e.exports = r
    }, {"../../../substance/document": 173, "../text/text_node": 116}],
    71: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.call(this, t, e), this.$el.addClass("level-" + this.node.level)
        }

        var o = t("../node").View, i = t("../../../substance/application").$$;
        (r.Prototype = function () {
            this.render = function () {
                var t, e;
                return this.node.content.length && (o.prototype.render.call(this), t = this.createTextPropertyView([this.node.id, "content"], {classes: "title"}), this.node.label && (e = i(".label", {text: this.node.label}), this.content.appendChild(e)), this.content.appendChild(t.render().el)), this
            }, this.renderTocItem = function () {
                var t = i("div"),
                    e = (this.node.label && (e = i(".label", {text: this.node.label}), t.appendChild(e)), i("span"));
                if (this.renderAnnotatedText([this.node.id, "content"], e), t.appendChild(e), void 0 !== this.node.authors && 0 < this.node.authors.length) {
                    var n = i("div");
                    $(n).addClass("authors");
                    for (var r = 0; r < this.node.authors.length; r++) {
                        var o = document.createElement("span");
                        $(o).addClass("author"), o.appendChild(document.createTextNode(this.node.authors[r])), n.appendChild(o), t.appendChild(n)
                    }
                }
                return t
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"../../../substance/application": 160, "../node": 91}],
    72: [function (t, e, n) {
        "use strict";
        e.exports = {Model: t("./heading"), View: t("./heading_view")}
    }, {"./heading": 70, "./heading_view": 71}],
    73: [function (t, e, n) {
        "use strict";
        t("../../../substance/document").Node;

        function r(t, e) {
            o.call(this, t, e)
        }

        var o = t("../web_resource").Model;
        r.type = {id: "image", parent: "webresource", properties: {source_id: "string"}}, r.example = {
            type: "image",
            id: "image_1",
            url: "http://substance.io/image_1.png"
        }, r.description = {
            name: "Image",
            remarks: ["Represents a web-resource for an image."],
            properties: {}
        }, (r.Prototype = function () {
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r.prototype.constructor = r
    }, {"../../../substance/document": 173, "../web_resource": 124}],
    74: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.call(this, t, e)
        }

        var o = t("../node").View;
        (r.Prototype = function () {
            var r = Array.prototype.indexOf;
            this.render = function () {
                var t = document.createElement("div"), e = (t.className = "content", document.createElement("div")),
                    n = (e.className = "image-char", this._imgChar = e, document.createElement("img"));
                return n.src = this.node.url, n.alt = "alt text", n.title = "alt text", e.appendChild(n), t.appendChild(e), this.el.appendChild(t), this._imgPos = r.call(e.childNodes, n), this
            }, this.delete = function (t, e) {
                for (var n = this.$(".content")[0], r = n.childNodes, o = e - 1; 0 <= o; o--) n.removeChild(r[t + o])
            }, this.getCharPosition = function (t, e) {
                if (t === this._imgChar) return e > this._imgPos ? 1 : 0;
                console.log("Errhhh..")
            }, this.getDOMPosition = function (t) {
                var e = this.$(".content")[0], n = document.createRange();
                return 0 === t ? n.setStartBefore(e.childNodes[0]) : n.setStartAfter(e.childNodes[0]), n
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"../node": 91}],
    75: [function (t, e, n) {
        "use strict";
        e.exports = {Model: t("./image"), View: t("./image_view")}
    }, {"./image": 73, "./image_view": 74}],
    76: [function (t, e, n) {
        "use strict";
        e.exports = {
            node: t("./node"),
            capitalize: t("./capitalize"),
            composite: t("./composite"),
            annotation: t("./annotation"),
            emphasis: t("./emphasis"),
            strong: t("./strong"),
            subscript: t("./subscript"),
            superscript: t("./superscript"),
            underline: t("./underline"),
            code: t("./code"),
            author_callout: t("./author_callout"),
            custom_annotation: t("./custom_annotation"),
            "inline-formula": t("./inline_formula"),
            resource_reference: t("./resource_reference"),
            contributor_reference: t("./contributor_reference"),
            figure_reference: t("./figure_reference"),
            citation_reference: t("./citation_reference"),
            footnote_reference: t("./footnote_reference"),
            definition_reference: t("./definition_reference"),
            cross_reference: t("./cross_reference"),
            publication_info: t("./publication_info"),
            link: t("./link"),
            inline_image: t("./inline_image"),
            document: t("./document"),
            text: t("./text"),
            paragraph: t("./paragraph"),
            heading: t("./heading"),
            box: t("./box"),
            cover: t("./cover"),
            figure: t("./figure"),
            caption: t("./caption"),
            image: t("./image"),
            webresource: t("./web_resource"),
            supplement: t("./supplement"),
            video: t("./video"),
            contributor: t("./contributor"),
            definition: t("./definition"),
            citation: t("./citation"),
            mixed_citation: t("./mixed_citation"),
            formula: t("./formula"),
            list: t("./list"),
            codeblock: t("./codeblock"),
            affiliation: t("./_affiliation"),
            footnote: t("./footnote"),
            quote: t("./quote")
        }
    }, {
        "./_affiliation": 7,
        "./annotation": 10,
        "./author_callout": 13,
        "./box": 16,
        "./capitalize": 18,
        "./caption": 21,
        "./citation": 24,
        "./citation_reference": 26,
        "./code": 28,
        "./codeblock": 31,
        "./composite": 33,
        "./contributor": 36,
        "./contributor_reference": 38,
        "./cover": 41,
        "./cross_reference": 44,
        "./custom_annotation": 47,
        "./definition": 50,
        "./definition_reference": 52,
        "./document": 54,
        "./emphasis": 56,
        "./figure": 59,
        "./figure_reference": 61,
        "./footnote": 64,
        "./footnote_reference": 66,
        "./formula": 69,
        "./heading": 72,
        "./image": 75,
        "./inline_formula": 77,
        "./inline_image": 80,
        "./link": 82,
        "./list": 85,
        "./mixed_citation": 88,
        "./node": 91,
        "./paragraph": 94,
        "./publication_info": 97,
        "./quote": 100,
        "./resource_reference": 103,
        "./strong": 106,
        "./subscript": 108,
        "./superscript": 110,
        "./supplement": 112,
        "./text": 115,
        "./underline": 119,
        "./video": 121,
        "./web_resource": 124
    }],
    77: [function (t, e, n) {
        e.exports = {Model: t("./inline_formula.js"), View: t("./inline_formula_view.js")}
    }, {"./inline_formula.js": 78, "./inline_formula_view.js": 79}],
    78: [function (t, e, n) {
        function r(t, e) {
            i.call(this, t, e)
        }

        var o = t("../../../substance/document"), i = t("../annotation/annotation");
        r.type = {
            id: "inline-formula",
            parent: "annotation",
            properties: {target: "formula"}
        }, (r.Prototype = function () {
        }).prototype = i.prototype, ((r.prototype = new r.Prototype).constructor = r).fragmentation = i.NEVER, o.Node.defineProperties(r), e.exports = r
    }, {"../../../substance/document": 173, "../annotation/annotation": 8}],
    79: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.call(this, t, e), $(this.el).removeClass("resource-reference")
        }

        var o = t("../resource_reference").View;
        (r.Prototype = function () {
            this.createElement = function () {
                return document.createElement("span")
            }, this.render = function () {
                var t = this.node.document.get(this.node.target), t = this.viewFactory.createView(t);
                return this.el.innerHTML = t.render().el.innerHTML, this
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"../resource_reference": 103}],
    80: [function (t, e, n) {
        e.exports = {Model: t("./inline_image.js"), View: t("../annotation/annotation_view.js")}
    }, {"../annotation/annotation_view.js": 9, "./inline_image.js": 81}],
    81: [function (t, e, n) {
        function r(t, e) {
            i.call(this, t, e)
        }

        var o = t("../../../substance/document"), i = t("../annotation/annotation");
        r.type = {id: "inline-image", parent: "annotation", properties: {target: "image"}}, (r.Prototype = function () {
        }).prototype = i.prototype, ((r.prototype = new r.Prototype).constructor = r).fragmentation = i.NEVER, o.Node.defineProperties(r), e.exports = r
    }, {"../../../substance/document": 173, "../annotation/annotation": 8}],
    82: [function (t, e, n) {
        e.exports = {Model: t("./link.js"), View: t("./link_view.js")}
    }, {"./link.js": 83, "./link_view.js": 84}],
    83: [function (t, e, n) {
        function r(t, e) {
            i.call(this, t, e)
        }

        var o = t("../../../substance/document"), i = t("../annotation/annotation");
        r.type = {id: "link", parent: "annotation", properties: {url: "string"}}, (r.Prototype = function () {
        }).prototype = i.prototype, ((r.prototype = new r.Prototype).constructor = r).fragmentation = i.NEVER, o.Node.defineProperties(r), e.exports = r
    }, {"../../../substance/document": 173, "../annotation/annotation": 8}],
    84: [function (t, e, n) {
        function r(t) {
            o.call(this, t)
        }

        var o = t("../annotation").View;
        (r.Prototype = function () {
            this.createElement = function () {
                var t = document.createElement("a");
                return t.setAttribute("href", this.node.url), t.setAttribute("target", "_blank"), t
            }, this.setClasses = function () {
                this.$el.addClass("link")
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"../annotation": 10}],
    85: [function (t, e, n) {
        "use strict";
        e.exports = {Model: t("./list"), View: t("./list_view")}
    }, {"./list": 86, "./list_view": 87}],
    86: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            s.call(this, t, e)
        }

        var o = t("underscore"), t = t("../../../substance/document"), i = t.Node, s = t.Composite;
        r.type = {
            id: "list",
            parent: "content",
            properties: {
                source_id: "string",
                items: ["array", "paragraph"],
                item_ids: ["array", "integer"],
                ordered: "boolean",
                list_type: "string"
            }
        }, r.description = {
            name: "List",
            remarks: ["Lists can either be numbered or bullet lists"],
            properties: {
                ordered: "Specifies wheter the list is ordered or not",
                items: "An array of paragraph references"
            }
        }, r.example = {
            type: "list",
            id: "list_1",
            "items ": ["paragraph_listitem_1", "paragraph_listitem_2"]
        }, (r.Prototype = function () {
            this.getLength = function () {
                return this.properties.items.length
            }, this.getChildrenIds = function () {
                return o.clone(this.items)
            }, this.getItems = function () {
                return o.map(this.properties.items, function (t) {
                    return this.document.get(t)
                }, this)
            }, this.getChangePosition = function (t) {
                if ("items" === t.path[1]) if ("update" === t.type) {
                    var e = t.diff;
                    if (e.isInsert()) return t.diff.pos + 1;
                    if (e.isDelete()) return t.diff.pos;
                    if (e.isMove()) return t.diff.target
                } else if ("set" === t.type) return this.properties.items.length - 1;
                return -1
            }, this.isMutable = function () {
                return !0
            }, this.insertChild = function (t, e, n) {
                t.update([this.id, "items"], ["+", e, n])
            }, this.deleteChild = function (t, e) {
                var n = this.items.indexOf(e);
                t.update([this.id, "items"], ["-", n, e]), t.delete(e)
            }, this.canJoin = function (t) {
                return "list" === t.type
            }, this.isBreakable = function () {
                return !0
            }, this.break = function (t, e, n) {
                var r = this.properties.items.indexOf(e);
                if (r < 0) throw new Error("Unknown child " + e);
                e = t.get(e).break(t, n);
                return t.update([this.id, "items"], ["+", r + 1, e.id]), e
            }
        }).prototype = s.prototype, r.prototype = new r.Prototype, i.defineProperties((r.prototype.constructor = r).prototype, ["items", "ordered"]), e.exports = r
    }, {"../../../substance/document": 173, underscore: 130}],
    87: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.call(this, t, e)
        }

        var o = t("../composite/composite_view"), c = t("./list");
        t("underscore");
        r.whoami = "SubstanceListView", (r.Prototype = function () {
            this.render = function () {
                this.el.innerHTML = "";
                var t = this.node.ordered ? "OL" : "UL",
                    t = (this.content = document.createElement(t), this.content.classList.add("content"), this.node.properties.list_type);
                for (t && this.content.classList.add(t), o = 0; o < this.childrenViews.length; o++) this.childrenViews[o].dispose();
                for (var e = this.node.getNodes(), n = this.node.properties.item_ids, r = 0, o = 0; o < e.length; o++) {
                    var i, s = this.node.document.get(e[o]), a = this.viewFactory.createView(s);
                    s instanceof c ? i = a.render().el : (i = r != n[o] | 0 == r ? document.createElement("LI") : i).appendChild(a.render().el), this.content.appendChild(i), this.childrenViews.push(a), r = n[o]
                }
                return this.el.appendChild(this.content), this
            }, this.onNodeUpdate = function (t) {
                t.path[0] === this.node.id && "items" === t.path[1] && this.render()
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"../composite/composite_view": 32, "./list": 86, underscore: 130}],
    88: [function (t, e, n) {
        "use strict";
        e.exports = {Model: t("./mixed_citation"), View: t("./mixed_citation_view")}
    }, {"./mixed_citation": 89, "./mixed_citation_view": 90}],
    89: [function (t, e, n) {
        function r(t, e) {
            i.Node.call(this, t, e)
        }

        var o = t("underscore"), i = t("../../../substance/document");
        r.type = {
            id: "mixed_citation",
            parent: "content",
            properties: {
                source_id: "string",
                text: "object",
                title: "string",
                label: "string",
                authors: ["array", "string"],
                doi: "string",
                source: "string",
                volume: "string",
                citation_type: "string",
                publisher_name: "string",
                publisher_location: "string",
                fpage: "string",
                lpage: "string",
                year: "string",
                comment: "string",
                citation_urls: ["array", "object"],
                source_formats: ["array", "object"]
            }
        }, r.description = {
            name: "MixedCitation",
            remarks: ["A journal citation.", "This element can be used to describe all kinds of citations."],
            properties: {
                title: "The article's title",
                label: "Optional label (could be a number for instance)",
                doi: "DOI reference",
                source: "Usually the journal name",
                volume: "Issue number",
                citation_type: "Footnote Type",
                publisher_name: "Publisher Name",
                publisher_location: "Publisher Location",
                fpage: "First page",
                lpage: "Last page",
                year: "The year of publication",
                comment: "Author comment.",
                citation_urls: "A list of links for accessing the article on the web"
            }
        }, r.example = {
            id: "article_nature08160",
            type: "article_citation",
            label: "5",
            title: "The genome of the blood fluke Schistosoma mansoni",
            authors: ["M Berriman", "BJ Haas", "PT LoVerde"],
            citation_type: "Journal Article",
            doi: "http://dx.doi.org/10.1038/nature08160",
            source: "Nature",
            volume: "460",
            fpage: "352",
            lpage: "8",
            year: "1984",
            comment: "This is a comment.",
            citation_urls: [{name: "PubMed", url: "http://www.ncbi.nlm.nih.gov/pubmed/19606141"}]
        }, (r.Prototype = function () {
            this.urls = function () {
                return 0 < this.properties.citation_urls.length ? this.properties.citation_urls : [this.properties.doi]
            }, this.getHeader = function () {
                return o.compact([this.properties.label, this.properties.citation_type || locales.Reference]).join(" - ")
            }
        }).prototype = i.Node.prototype, r.prototype = new r.Prototype, i.Node.defineProperties(r.prototype.constructor = r), e.exports = r
    }, {"../../../substance/document": 173, underscore: 130}],
    90: [function (t, e, n) {
        "use strict";

        function r(t, e, n) {
            i.apply(this, arguments), s.call(this, n)
        }

        var o = t("underscore"), i = (t("../../../substance/application").$$, t("../node").View),
            s = t("../../resource_view");
        (r.Prototype = function () {
            o.extend(this, s.prototype), this.renderBody = function () {
                var t, e = document.createDocumentFragment(), n = this.node.properties.text[0].nodes;
                if (void 0 !== n) {
                    for (var r, o = 0; o < n.length; o++) "italic" == n[o].tagName ? ((t = document.createElement("span")).className = "citation-italic", t.innerHTML = n[o].textContent, e.appendChild(t)) : "ext-link" == n[o].tagName ? ((t = document.createElement("a")).className = "content-node link", t.setAttribute("href", n[o]), (r = n[o].getAttributeNodeNS("http://www.w3.org/1999/xlink", "href")) && (t.innerHTML = n[o].textContent, t.setAttribute("href", r.textContent)), t.setAttribute("target", "_blank"), e.appendChild(t)) : e.appendChild(n[o]);
                    this.content.appendChild(e)
                }
            }
        }).prototype = i.prototype, r.prototype = new r.Prototype, e.exports = r.prototype.constructor = r
    }, {"../../../substance/application": 160, "../../resource_view": 126, "../node": 91, underscore: 130}],
    91: [function (t, e, n) {
        "use strict";
        e.exports = {Model: t("./node"), View: t("./node_view")}
    }, {"./node": 92, "./node_view": 93}],
    92: [function (t, e, n) {
        "use strict";
        t = t("../../../substance/document").Node;
        t.description = {
            name: "Node",
            remarks: ["Abstract node type."],
            properties: {source_id: "Useful for document conversion where the original id of an element should be remembered."}
        }, e.exports = t
    }, {"../../../substance/document": 173}],
    93: [function (t, e, n) {
        "use strict";

        function r(t, e, n) {
            if (s.call(this, n), this.node = t, !(this.viewFactory = e)) throw new Error('Illegal argument. Argument "viewFactory" is mandatory.');
            if (this.$el.addClass("content-node").addClass(t.type.replace("_", "-")), this.el.dataset.id = this.node.id, "paragraph" === t.type && void 0 !== t.properties.attributes) {
                var r = t.properties.attributes;
                if (0 < r.length) for (var o = 0; o < r.length; o++) {
                    var i = r[o];
                    "content-type" === i.name && this.$el.addClass(i.value)
                }
            }
        }

        var s = t("../../../substance/application").View, o = t("../text/text_property_view");
        (r.Prototype = function () {
            this.render = function () {
                return this.content = document.createElement("DIV"), this.content.classList.add("content"), this.focusHandle = document.createElement("DIV"), this.focusHandle.classList.add("focus-handle"), this.el.appendChild(this.content), this.el.appendChild(this.focusHandle), this
            }, this.dispose = function () {
                this.stopListening()
            }, this.createView = function (t) {
                t = this.node.document.get(t);
                return this.viewFactory.createView(t)
            }, this.createTextView = function (t) {
                return console.error("FIXME: NodeView.createTextView() is deprecated. Use NodeView.createTextPropertyView() instead."), this.viewFactory.createView(this.node, t, "text")
            }, this.createTextPropertyView = function (t, e) {
                return new o(this.node.document, t, this.viewFactory, e)
            }, this.renderAnnotatedText = function (t, e) {
                return o.renderAnnotatedText(this.node.document, t, e, this.viewFactory)
            }
        }).prototype = s.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"../../../substance/application": 160, "../text/text_property_view": 117}],
    94: [function (t, e, n) {
        "use strict";
        e.exports = {Model: t("./paragraph"), View: t("./paragraph_view")}
    }, {"./paragraph": 95, "./paragraph_view": 96}],
    95: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            s.call(this, t, e)
        }

        var o = t("underscore"), t = t("../../../substance/document"), i = t.Node, s = t.Composite;
        r.type = {
            id: "paragraph",
            parent: "content",
            properties: {children: ["array", "content"]},
            attributes: "object"
        }, r.description = {
            name: "Paragraph",
            remarks: ["A Paragraph can have inline elements such as images."],
            properties: {children: "An array of content node references"}
        }, r.example = {
            type: "paragraph",
            id: "paragraph_1",
            "children ": ["text_1", "image_1", "text_2"]
        }, (r.Prototype = function () {
            this.getLength = function () {
                return this.properties.children.length
            }, this.getChildrenIds = function () {
                return o.clone(this.properties.children)
            }, this.getChildren = function () {
                return o.map(this.properties.children, function (t) {
                    return this.document.get(t)
                }, this)
            }
        }).prototype = s.prototype, r.prototype = new r.Prototype, i.defineProperties((r.prototype.constructor = r).prototype, ["children"]), e.exports = r
    }, {"../../../substance/document": 173, underscore: 130}],
    96: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.call(this, t, e)
        }

        var o = t("../composite/composite_view");
        (r.Prototype = function () {
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"../composite/composite_view": 32}],
    97: [function (t, e, n) {
        "use strict";
        e.exports = {Model: t("./publication_info"), View: t("./publication_info_view")}
    }, {"./publication_info": 98, "./publication_info_view": 99}],
    98: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.Node.call(this, t, e)
        }

        var o = t("../../../substance/document");
        r.type = {
            id: "publication_info",
            parent: "content",
            properties: {
                history: ["array", "object"],
                published_on: "string",
                journal: "string",
                provider: "string",
                article_type: "string",
                keywords: ["array", "string"],
                research_organisms: ["array", "string"],
                subjects: ["array", "string"],
                links: ["array", "objects"],
                doi: "string",
                related_article: "string",
                article_info: "paragraph",
                subject_link: "string",
                article_type_link: "string"
            }
        }, r.description = {
            name: "PublicationInfo",
            description: "PublicationInfo Node",
            remarks: ["Summarizes the article's meta information. Meant to be customized by publishers"],
            properties: {
                received_on: "Submission received",
                accepted_on: "Paper accepted on",
                published_on: "Paper published on",
                history: "History of the submission cycle",
                journal: "The Journal",
                provider: "Who is hosting this article",
                article_type: "Research Article vs. Insight, vs. Correction etc.",
                keywords: "Article's keywords",
                research_organisms: "Research Organisms",
                subjects: "Article Subjects",
                doi: "Article DOI",
                related_article: "DOI of related article if there is any"
            }
        }, r.example = {
            id: "publication_info",
            published_on: "2012-11-13",
            history: [{type: "received", date: "2012-06-20"}, {type: "accepted", date: "2012-09-05"}],
            journal: "eLife",
            provider: "eLife",
            article_type: "Research Article",
            keywords: ["innate immunity", "histones", "lipid droplet", "anti-bacterial"],
            research_organisms: ["B. subtilis", "D. melanogaster", "E. coli", "Mouse"],
            subjects: ["Immunology", "Microbiology and infectious disease"],
            doi: "http://dx.doi.org/10.7554/eLife.00003"
        }, (r.Prototype = function () {
            this.getArticleInfo = function () {
                return this.document.get("articleinfo")
            }, this.getSubjectLinks = function () {
                return this.subjects.map(function (t) {
                    return {name: t, url: this.subject_link + "/" + t.replace(/ /g, "-").toLowerCase()}
                }.bind(this))
            }, this.getArticleTypeLink = function () {
                return {
                    name: this.article_type,
                    url: this.article_type_link + "/" + this.article_type.replace(/ /g, "-").toLowerCase()
                }
            }
        }).prototype = o.Node.prototype, r.prototype = new r.Prototype, o.Node.defineProperties(r.prototype.constructor = r), e.exports = r
    }, {"../../../substance/document": 173}],
    99: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.call(this, t, e)
        }

        var o = t("../node").View, i = t("../../../substance/application").$$, s = t("../../article_util"), a = {
            received: "received",
            accepted: "accepted",
            revised: "revised",
            corrected: "corrected",
            "rev-recd": "revised",
            "rev-request": "returned for modification",
            published: "Published",
            default: "updated"
        };
        (r.Prototype = function () {
            this.render = function () {
                o.prototype.render.call(this);
                var t = i(".meta-data"),
                    e = (this.node.article_type && (e = i(".article-type.container", {children: [i("div.label", {text: "Article Type"}), i("div.value", {text: this.node.article_type})]}), t.appendChild(e)), this.node.subjects && 0 < this.node.subjects.length && (e = i(".subject.container", {children: [i("div.label", {text: "Subject"}), i("div.value", {text: this.node.subjects.join(", ")})]}), t.appendChild(e)), this.node.research_organisms && 0 < this.node.research_organisms.length && (e = i(".subject.container", {children: [i("div.label", {text: "Organism"}), i("div.value", {text: this.node.research_organisms.join(", ")})]}), t.appendChild(e)), this.node.keywords && 0 < this.node.keywords.length && (e = i(".keywords.container", {children: [i("div.label", {text: "Keywords"}), i("div.value", {text: this.node.keywords.join(", ")})]}), t.appendChild(e)), this.node.doi && (e = i(".doi.container", {
                        children: [i("div.label", {text: "DOI"}), i("div.value", {
                            children: [i("a", {
                                href: "https://doi.org/" + this.node.doi,
                                text: this.node.doi,
                                target: "_blank"
                            })]
                        })]
                    }), t.appendChild(e)), this.node.related_article && (e = i(".related-article.container", {
                        children: [i("div.label", {text: "Related Article"}), i("div.value", {
                            children: [i("a", {
                                href: this.node.related_article,
                                text: this.node.related_article
                            })]
                        })]
                    }), t.appendChild(e)), this.describePublicationHistory()),
                    e = (t.appendChild(e), this.content.appendChild(t), this.node.getArticleInfo()),
                    t = this.viewFactory.createView(e).render().el;
                return this.content.appendChild(t), this
            }, this.describePublicationHistory = function () {
                var t, e = i(".dates"), n = [];
                if (this.node.history && 0 < this.node.history.length && (n = n.concat(this.node.history)), this.node.published_on && n.push({
                    type: "published",
                    date: this.node.published_on
                }), 0 < n.length) {
                    for (e.appendChild(document.createTextNode("")), t = 0; t < n.length; t++) {
                        0 < t && (e.appendChild(document.createTextNode(", ")), t === n.length - 1 && e.appendChild(document.createTextNode("and ")));
                        var r = n[t];
                        e.appendChild(document.createTextNode((a[r.type] || a.default) + " on ")), e.appendChild(i("b", {text: s.formatDate(r.date)}))
                    }
                    e.appendChild(document.createTextNode("."))
                }
                return e
            }, this.dispose = function () {
                o.prototype.dispose.call(this)
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"../../../substance/application": 160, "../../article_util": 4, "../node": 91}],
    100: [function (t, e, n) {
        "use strict";
        e.exports = {Model: t("./quote"), View: t("./quote_view")}
    }, {"./quote": 101, "./quote_view": 102}],
    101: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.call(this, t, e)
        }

        var t = t("../../../substance/document"), o = t.Composite;
        r.type = {
            id: "quote",
            parent: "content",
            properties: {source_id: "string", label: "string", children: ["array", "object"]}
        }, r.description = {
            name: "Quote",
            remarks: ["A quote type."],
            properties: {label: "string", children: "0..n Paragraph nodes"}
        }, r.example = {
            id: "quote_1",
            type: "quote",
            label: "Quote 1",
            children: ["paragraph_1", "paragraph_2"]
        }, (r.Prototype = function () {
            this.getChildrenIds = function () {
                return this.properties.children
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, t.Node.defineProperties(r.prototype.constructor = r), e.exports = r
    }, {"../../../substance/document": 173}],
    102: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            i.call(this, t, e)
        }

        var o = t("../node").View, i = t("../composite").View, s = t("../../../substance/application").$$;
        (r.Prototype = function () {
            this.render = function () {
                var t;
                return o.prototype.render.call(this), this.node.label && (t = s(".label", {text: this.node.label}), this.content.appendChild(t)), this.renderChildren(), this.el.appendChild(this.content), this
            }
        }).prototype = i.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"../../../substance/application": 160, "../composite": 33, "../node": 91}],
    103: [function (t, e, n) {
        e.exports = {Model: t("./resource_reference.js"), View: t("./resource_reference_view.js")}
    }, {"./resource_reference.js": 104, "./resource_reference_view.js": 105}],
    104: [function (t, e, n) {
        function r(t, e) {
            i.call(this, t, e)
        }

        var o = t("../../../substance/document"), i = t("../annotation/annotation");
        r.type = {
            id: "resource_reference",
            parent: "annotation",
            properties: {target: "node"}
        }, (r.Prototype = function () {
        }).prototype = i.prototype, ((r.prototype = new r.Prototype).constructor = r).fragmentation = i.NEVER, o.Node.defineProperties(r), e.exports = r
    }, {"../../../substance/document": 173, "../annotation/annotation": 8}],
    105: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.call(this, t, e), this.$el.addClass("resource-reference")
        }

        var o = t("../annotation/annotation_view");
        (r.Prototype = function () {
            this.createElement = function () {
                var t = document.createElement("a");
                return t.setAttribute("href", ""), t
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"../annotation/annotation_view": 9}],
    106: [function (t, e, n) {
        e.exports = {Model: t("./strong.js"), View: t("../annotation/annotation_view.js")}
    }, {"../annotation/annotation_view.js": 9, "./strong.js": 107}],
    107: [function (t, e, n) {
        function r(t, e) {
            o.call(this, t, e)
        }

        var o = t("../annotation/annotation");
        r.type = {id: "strong", parent: "annotation", properties: {}}, (r.Prototype = function () {
        }).prototype = o.prototype, ((r.prototype = new r.Prototype).constructor = r).fragmentation = o.DONT_CARE, e.exports = r
    }, {"../annotation/annotation": 8}],
    108: [function (t, e, n) {
        e.exports = {Model: t("./subscript.js"), View: t("../annotation/annotation_view.js")}
    }, {"../annotation/annotation_view.js": 9, "./subscript.js": 109}],
    109: [function (t, e, n) {
        function r(t, e) {
            o.call(this, t, e)
        }

        var o = t("../annotation/annotation");
        r.type = {id: "subscript", parent: "annotation", properties: {}}, (r.Prototype = function () {
        }).prototype = o.prototype, ((r.prototype = new r.Prototype).constructor = r).fragmentation = o.DONT_CARE, e.exports = r
    }, {"../annotation/annotation": 8}],
    110: [function (t, e, n) {
        e.exports = {Model: t("./superscript.js"), View: t("../annotation/annotation_view.js")}
    }, {"../annotation/annotation_view.js": 9, "./superscript.js": 111}],
    111: [function (t, e, n) {
        function r(t, e) {
            o.call(this, t, e)
        }

        var o = t("../annotation/annotation");
        r.type = {id: "superscript", parent: "annotation", properties: {}}, (r.Prototype = function () {
        }).prototype = o.prototype, ((r.prototype = new r.Prototype).constructor = r).fragmentation = o.DONT_CARE, e.exports = r
    }, {"../annotation/annotation": 8}],
    112: [function (t, e, n) {
        "use strict";
        e.exports = {Model: t("./supplement"), View: t("./supplement_view")}
    }, {"./supplement": 113, "./supplement_view": 114}],
    113: [function (t, e, n) {
        t("underscore");

        function r(t, e) {
            o.Composite.call(this, t, e)
        }

        var o = t("../../../substance/document");
        r.type = {
            id: "supplement",
            parent: "content",
            properties: {source_id: "string", label: "string", url: "string", caption: "caption"}
        }, r.description = {
            name: "Supplement",
            remarks: ["A Supplement entity."],
            properties: {
                source_id: "Supplement id as it occurs in the source NLM file",
                label: "Supplement label",
                caption: "References a caption node, that has all the content",
                url: "URL of downloadable file"
            }
        }, r.example = {
            id: "supplement_1",
            source_id: "SD1-data",
            type: "supplement",
            label: "Supplementary file 1.",
            url: "http://myserver.com/myfile.pdf",
            caption: "caption_supplement_1"
        }, (r.Prototype = function () {
            this.getChildrenIds = function () {
                var t = [];
                return this.properties.caption && t.push(this.properties.caption), t
            }, this.getCaption = function () {
                return this.properties.caption ? this.document.get(this.properties.caption) : null
            }, this.getHeader = function () {
                return this.properties.label
            }
        }).prototype = o.Composite.prototype, r.prototype = new r.Prototype, o.Node.defineProperties(r.prototype.constructor = r), e.exports = r
    }, {"../../../substance/document": 173, underscore: 130}],
    114: [function (t, e, n) {
        "use strict";

        function r(t, e, n) {
            i.call(this, t, e), a.call(this, n)
        }

        var o = t("underscore"), i = t("../composite").View, s = t("../../../substance/application").$$,
            a = t("../../resource_view");
        (r.Prototype = function () {
            o.extend(this, a.prototype), this.renderBody = function () {
                this.renderChildren();
                var t = s("div.file", {
                    children: [s("a", {
                        href: this.node.url,
                        html: '<i class="fa fa-download"/> Download'
                    })]
                });
                this.content.appendChild(t)
            }
        }).prototype = i.prototype, r.prototype = new r.Prototype, e.exports = r.prototype.constructor = r
    }, {"../../../substance/application": 160, "../../resource_view": 126, "../composite": 33, underscore: 130}],
    115: [function (t, e, n) {
        "use strict";
        e.exports = {Model: t("./text_node"), View: t("./text_view")}
    }, {"./text_node": 116, "./text_view": 118}],
    116: [function (t, e, n) {
        "use strict";
        t = t("../../../substance/document");
        e.exports = t.TextNode
    }, {"../../../substance/document": 173}],
    117: [function (t, e, n) {
        "use strict";

        function r(t, e, n, r) {
            (r = r || {}).elementType = r.elementType || "span", o.call(this, r), this.path = e, this.document = t, this.viewFactory = n, this.options = r || {}, this.property = t.resolve(this.path), this.$el.addClass("text"), this.options.classes && this.$el.addClass(this.options.classes)
        }

        var u = t("../../../substance/util").Fragmenter, o = t("../../../substance/application").View;
        (r.Prototype = function () {
            this.render = function () {
                return this.el.innerHTML = "", r.renderAnnotatedText(this.document, this.path, this.el, this.viewFactory), this
            }, this.dispose = function () {
                this.stopListening()
            }, this.renderWithAnnotations = function (t) {
                var n = this, e = this.property.get(), r = document.createDocumentFragment(), o = this.document, i = [],
                    s = new u;
                s.onText = function (t, e) {
                    t.appendChild(document.createTextNode(e))
                }, s.onEnter = function (t, e) {
                    t = o.get(t.id), t = n.viewFactory.createView(t);
                    return e.appendChild(t.el), i.push(t), t.el
                }, s.start(r, e, t);
                for (var a = 0; a < i.length; a++) i[a].render();
                this.el.innerHTML = "", this.el.appendChild(r)
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, r.renderAnnotatedText = function (n, t, e, r) {
            var o = window.document.createDocumentFragment(), i = n.get(t), t = n.getIndex("annotations").get(t),
                s = [], a = new u;
            a.onText = function (t, e) {
                t.appendChild(window.document.createTextNode(e))
            }, a.onEnter = function (t, e) {
                t = n.get(t.id), t = r.createView(t);
                return e.appendChild(t.el), s.push(t), t.el
            }, a.start(o, i, t);
            for (var c = 0; c < s.length; c++) s[c].render();
            e.appendChild(o)
        }, e.exports = r
    }, {"../../../substance/application": 160, "../../../substance/util": 182}],
    118: [function (t, e, n) {
        "use strict";

        function r(t, e, n) {
            o.call(this, t, e), n = this.options = n || {}, this.path = n.path || [t.id, "content"], this.property = t.document.resolve(this.path), this.$el.addClass("text"), n.classes && this.$el.addClass(n.classes), n.path && this.$el.removeClass("content-node"), this._annotations = {}
        }

        var c = t("../../../substance/util").Fragmenter, o = t("../node/node_view"),
            i = t("../../../substance/application").$$;
        (r.Prototype = function () {
            this.render = function () {
                return o.prototype.render.call(this), this.renderContent(), this
            }, this.dispose = function () {
                o.prototype.dispose.call(this)
            }, this.renderContent = function () {
                this.content.innerHTML = "", this._annotations = this.node.document.getIndex("annotations").get(this.path), this.renderWithAnnotations(this._annotations)
            }, this.createAnnotationElement = function (t) {
                return this.options.createAnnotationElement ? this.options.createAnnotationElement.call(this, t) : "link" === t.type ? i("a.annotation." + t.type, {
                    id: t.id,
                    href: this.node.document.get(t.id).url
                }) : i("span.annotation." + t.type, {id: t.id})
            }, this.renderWithAnnotations = function (t) {
                var n = this, e = this.property.get(), r = document.createDocumentFragment(), o = this.node.document,
                    i = [], s = new c;
                s.onText = function (t, e) {
                    t.appendChild(document.createTextNode(e))
                }, s.onEnter = function (t, e) {
                    t = o.get(t.id), t = n.viewFactory.createView(t);
                    return e.appendChild(t.el), i.push(t), t.el
                }, s.start(r, e, t);
                for (var a = 0; a < i.length; a++) i[a].render();
                this.content.innerHTML = "", this.content.appendChild(r)
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"../../../substance/application": 160, "../../../substance/util": 182, "../node/node_view": 93}],
    119: [function (t, e, n) {
        e.exports = {Model: t("./underline.js"), View: t("../annotation/annotation_view.js")}
    }, {"../annotation/annotation_view.js": 9, "./underline.js": 120}],
    120: [function (t, e, n) {
        function r(t, e) {
            o.call(this, t, e)
        }

        var o = t("../annotation/annotation");
        r.type = {id: "underline", parent: "annotation", properties: {}}, (r.Prototype = function () {
        }).prototype = o.prototype, ((r.prototype = new r.Prototype).constructor = r).fragmentation = o.DONT_CARE, e.exports = r
    }, {"../annotation/annotation": 8}],
    121: [function (t, e, n) {
        "use strict";
        e.exports = {Model: t("./video"), View: t("./video_view")}
    }, {"./video": 122, "./video_view": 123}],
    122: [function (t, e, n) {
        function r(t, e) {
            o.Node.call(this, t, e)
        }

        var o = t("../../../substance/document");
        r.type = {
            id: "video",
            parent: "content",
            properties: {
                source_id: "string",
                label: "string",
                url: "string",
                url_webm: "string",
                url_ogv: "string",
                caption: "caption",
                poster: "string"
            }
        }, r.config = {zoomable: !0}, r.description = {
            name: "Video",
            remarks: ["A video type intended to refer to video resources.", "MP4, WebM and OGV formats are supported."],
            properties: {
                label: "Label shown in the resource header.",
                url: "URL to mp4 version of the video.",
                url_webm: "URL to WebM version of the video.",
                url_ogv: "URL to OGV version of the video.",
                poster: "Video poster image.",
                caption: "References a caption node, that has all the content"
            }
        }, r.example = {
            id: "video_1",
            type: "video",
            label: "Video 1.",
            url: "https://cdn.elifesciences.org/video/eLifeLensIntro2.mp4",
            url_webm: "https://cdn.elifesciences.org/video/eLifeLensIntro2.webm",
            url_ogv: "https://cdn.elifesciences.org/video/eLifeLensIntro2.ogv",
            poster: "https://cdn.elifesciences.org/video/eLifeLensIntro2.png",
            caption: "caption_25"
        }, (r.Prototype = function () {
            this.getHeader = function () {
                return this.properties.label
            }, this.getCaption = function () {
                return this.properties.caption ? this.document.get(this.properties.caption) : ""
            }, this.includeInToc = function () {
                return !1
            }
        }).prototype = o.Node.prototype, r.prototype = new r.Prototype, o.Node.defineProperties(r.prototype.constructor = r), e.exports = r
    }, {"../../../substance/document": 173}],
    123: [function (t, e, n) {
        "use strict";

        function r(t, e, n) {
            s.call(this, t, e), a.call(this, n)
        }

        var o = t("underscore"), i = t("../../../substance/application").$$, s = t("../node").View,
            a = t("../../resource_view");
        (r.Prototype = function () {
            o.extend(this, a.prototype), this.isZoomable = !0, this.renderBody = function () {
                var t = this.node, e = [i("source", {src: t.url})], e = (t.url_ogv && e.push(i("source", {
                    src: t.url_ogv,
                    type: "video/ogg; codecs=&quot;theora, vorbis&quot;"
                })), t.url_webm && e.push(i("source", {
                    src: t.url_webm,
                    type: "video/webm"
                })), i(".video-wrapper", {
                    children: [i("video", {
                        controls: "controls",
                        poster: t.poster,
                        preload: "none",
                        style: "background-color: black",
                        children: e
                    })]
                }));
                this.content.appendChild(e), t.title && this.content.appendChild(i(".title", {text: t.title})), this.node.caption && (e = this.createView(this.node.caption), this.content.appendChild(e.render().el), this.captionView = e), t.doi && this.content.appendChild(i(".doi", {
                    children: [i("b", {text: "DOI: "}), i("a", {
                        href: t.doi,
                        target: "_new",
                        text: t.doi
                    })]
                }))
            }
        }).prototype = s.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"../../../substance/application": 160, "../../resource_view": 126, "../node": 91, underscore: 130}],
    124: [function (t, e, n) {
        "use strict";
        e.exports = {Model: t("./web_resource"), View: t("../node").View}
    }, {"../node": 91, "./web_resource": 125}],
    125: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.call(this, t, e)
        }

        var o = t("../../../substance/document").Node;
        r.type = {
            id: "webresource",
            parent: "content",
            properties: {source_id: "string", url: "string"}
        }, r.description = {
            name: "WebResource",
            description: "A resource which can be accessed via URL",
            remarks: ["This element is a parent for several other nodes such as Image."],
            properties: {url: "URL to a resource"}
        }, r.example = {
            type: "webresource",
            id: "webresource_3",
            url: "http://elife.elifesciences.org/content/elife/1/e00311/F3.medium.gif"
        }, (r.Prototype = function () {
        }).prototype = o.prototype, r.prototype = new r.Prototype, o.defineProperties((r.prototype.constructor = r).prototype, ["url"]), e.exports = r
    }, {"../../../substance/document": 173}],
    126: [function (t, e, n) {
        "use strict";

        function r(t) {
            this.options = o.extend({}, a, t)
        }

        var o = t("underscore"), i = t("./nodes/node").View, s = t("../substance/application").$$,
            a = {header: !1, zoom: !1};
        r.Prototype = function () {
            this.isResourceView = !0, this.render = function () {
                return i.prototype.render.call(this), this.renderHeader(), this.renderBody(), this
            }, this.renderHeader = function () {
                var t, e;
                this.node;
                this.options.header && ((t = s(".resource-header")).appendChild(this.renderLabel()), e = s(".toggles"), this.options.zoom && e.appendChild(s("a.toggle.toggle-fullscreen", {
                    href: "#",
                    html: '<i class="fa fa-expand"></i> Fullscreen'
                })), e.appendChild(s("a.toggle-res.toggle.action-toggle-resource", {
                    href: "#",
                    html: '<i class="fa fa-eye"></i> Focus'
                })), t.appendChild(e), this.headerEl = t, this.el.insertBefore(t, this.content))
            }, this.renderLabel = function () {
                return s("div.name", {html: this.getHeader()})
            }, this.renderBody = function () {
            }, this.getHeader = function () {
                return this.node.getHeader()
            }
        }, r.prototype = new r.Prototype, e.exports = r
    }, {"../substance/application": 160, "./nodes/node": 91, underscore: 130}],
    127: [function (t, e, n) {
        function r(t, e) {
            this.nodeTypes = t, this.options = e || {}
        }

        r.Prototype = function () {
            this.getNodeViewClass = function (t, e) {
                e = e || t.type;
                var n = this.nodeTypes[e];
                if (!n) throw new Error("No node registered for type " + e + ".");
                e = n.View;
                if (e) return e;
                throw new Error('No view registered for type "' + t.type + '".')
            }, this.createView = function (t, e, n) {
                return new (this.getNodeViewClass(t, n))(t, this, e)
            }
        }, r.prototype = new r.Prototype, e.exports = r
    }, {}],
    128: [function (t, e, n) {
        "use strict";
        t = t("./lens_converter");
        e.exports = t
    }, {"./lens_converter": 129}],
    129: [function (t, e, n) {
        "use strict";

        function r(t) {
            this.options = t || r.DefaultOptions
        }

        var h = t("underscore"), d = t("../substance/util"), o = d.errors.define("ImporterError"), i = t("../article");
        r.Prototype = function () {
            this._annotationTypes = {
                bold: "strong",
                italic: "emphasis",
                monospace: "code",
                sub: "subscript",
                sup: "superscript",
                sc: "capitalize",
                underline: "underline",
                strike: "strike",
                "ext-link": "link",
                xref: "",
                email: "link",
                "named-content": "",
                "inline-formula": "inline-formula",
                uri: "link"
            }, this._refTypeMapping = {
                bibr: "citation_reference",
                fn: "footnote_reference",
                fig: "figure_reference",
                table: "figure_reference",
                "supplementary-material": "figure_reference",
                other: "figure_reference",
                list: "definition_reference"
            }, this._contribTypeMapping = {
                author: "Author",
                "author non-byline": "Author",
                auther: "Author",
                collab: "Collaborator",
                editor: "Editor",
                "guest-editor": "Guest Editor",
                "group-author": "Group Author",
                "reviewed-by": "Reviewer",
                "nominated-by": "Nominator",
                corresp: "Corresponding Author",
                other: "Other",
                "assoc-editor": "Associate Editor",
                "associate editor": "Associate Editor",
                "series-editor": "Series Editor",
                contributor: "Contributor",
                chairman: "Chairman",
                "monographs-editor": "Monographs Editor",
                "contrib-author": "Contributing Author",
                organizer: "Organizer",
                chair: "Chair",
                discussant: "Discussant",
                presenter: "Presenter",
                "guest-issue-editor": "Guest Issue Editor",
                participant: "Participant",
                translator: "Translator",
                "section-editor": "Section Editor",
                "section-author": "Section Author",
                "chapter-author": "Chapter Author"
            }, this.isAnnotation = function (t) {
                return void 0 !== this._annotationTypes[t]
            }, this.isParagraphish = function (t) {
                for (var e = 0; e < t.childNodes.length; e++) {
                    var n = t.childNodes[e];
                    if (n.nodeType !== Node.TEXT_NODE && !this.isAnnotation(n.tagName.toLowerCase())) return !1
                }
                return !0
            }, this.test = function (t, e) {
                return !0
            }, this.getName = function (t) {
                if (!t) return "N/A";
                var e = [], n = t.querySelector("surname"), r = t.querySelector("given-names"),
                    t = t.querySelector("suffix");
                return r && e.push(r.textContent), n && e.push(n.textContent), t ? [e.join(" "), t.textContent].join(", ") : e.join(" ")
            }, this.toHtml = function (t) {
                if (!t) return "";
                var e = document.createElement("DIV");
                return e.appendChild(t.cloneNode(!0)), e.innerHTML
            }, this.mmlToHtmlString = function (t) {
                return this.toHtml(t).replace(/<(\/)?mml:([^>]+)>/g, "<$1$2>")
            }, this.selectDirectChildren = function (t, e) {
                for (var n = [], r = t.querySelectorAll(e), o = 0; o < r.length; o++) {
                    var i = r[o];
                    i.parentElement === t && n.push(i)
                }
                return n
            }, this.import = function (t) {
                t = h.isString(t) ? (new DOMParser).parseFromString(t, "text/xml") : t, this.sanitizeXML(t);
                var e = this.createDocument(), e = (window.doc = e, this.createState(t, e));
                return this.document(e, t)
            }, this.sanitizeXML = function (t) {
            }, this.createState = function (t, e) {
                return new r.State(this, t, e)
            }, this.createDocument = function () {
                return new i
            }, this.show = function (e, t) {
                h.each(t, function (t) {
                    this.showNode(e, t)
                }, this)
            }, this.extractDate = function (t) {
                if (!t) return null;
                var e = t.querySelector("year"), n = t.querySelector("month"), t = t.querySelector("day"),
                    e = null !== e ? [e.textContent] : [];
                return n && e.push(n.textContent), t && e.push(t.textContent), e.join("-")
            }, this.extractURLSuffix = function (t) {
                return t = t.replace("https://doi.org/", "")
            }, this.extractPublicationInfo = function (t, e) {
                for (var n = t.doc, r = e.querySelector("article-meta"), o = r.querySelector("pub-date"), i = r.querySelectorAll("history date"), r = e.querySelector("journal-title"), s = e.querySelector("article-id[pub-id-type=doi]"), a = e.querySelector("related-article"), e = this.extractArticleInfo(t, e), c = {
                    id: "publication_info",
                    type: "publication_info",
                    published_on: this.extractDate(o),
                    journal: r ? r.textContent : "",
                    related_article: a ? a.getAttribute("xlink:href") : "",
                    doi: s ? this.extractURLSuffix(s.textContent) : "",
                    article_info: e.id,
                    article_type: "",
                    keywords: [],
                    links: [],
                    subjects: [],
                    supplements: [],
                    history: [],
                    research_organisms: [],
                    provider: ""
                }, u = 0; u < i.length; u++) {
                    var l = i[u], l = {type: l.getAttribute("date-type"), date: this.extractDate(l)};
                    c.history.push(l)
                }
                n.create(c), n.show("info", c.id, 0), this.enhancePublicationInfo(t, c)
            }, this.extractArticleInfo = function (t, e) {
                var n = {id: "articleinfo", type: "paragraph"}, r = t.doc, o = [];
                return o = (o = (o = (o = (o = (o = o.concat(this.extractEditor(t, e))).concat(this.extractDatasets(t, e))).concat(this.extractCustomMetaGroup(t, e))).concat(this.extractAcknowledgements(t, e))).concat(this.extractCopyrightAndLicense(t, e))).concat(this.extractNotes(t, e)), n.children = o, r.create(n), n
            }, this.extractEditor = function (t, e) {
                var n, r, o = [], i = t.doc, e = e.querySelector("contrib[contrib-type=editor]");
                return e && (n = [], (r = this.getName(e.querySelector("name"))) && n.push(r), (r = e.querySelector("institution")) && n.push(r.textContent), (r = e.querySelector("country")) && n.push(r.textContent), e = {
                    type: "heading",
                    id: t.nextId("heading"),
                    level: 3,
                    content: "Reviewing Editor"
                }, i.create(e), o.push(e.id), r = {
                    type: "text",
                    id: t.nextId("text"),
                    content: n.join(", ")
                }, i.create(r), o.push(r.id)), o
            }, this.extractDatasets = function (t, e) {
                for (var n = [], r = t.doc, o = e.querySelectorAll("sec"), i = 0; i < o.length; i++) {
                    var s = o[i];
                    if ("datasets" === s.getAttribute("sec-type")) for (var a = {
                        type: "heading",
                        id: t.nextId("heading"),
                        level: 3,
                        content: "Major Datasets"
                    }, c = (r.create(a), n.push(a.id), this.datasets(t, d.dom.getChildren(s))), u = 0; u < c.length; u++) c[u] && n.push(c[u])
                }
                return n
            };

            function n(t, e) {
                return e ? t.split(" ").map(function (t) {
                    return n(t)
                }).join(" ") : t.charAt(0).toUpperCase() + t.slice(1)
            }

            this.capitalized = n, this.extractAcknowledgements = function (n, t) {
                var r = [], o = n.doc, t = t.querySelectorAll("ack");
                return t && 0 < t.length && h.each(t, function (t) {
                    var e = t.querySelector("title"), e = {
                        type: "heading",
                        id: n.nextId("heading"),
                        level: 3,
                        content: e ? this.capitalized(e.textContent.toLowerCase(), "all") : "Acknowledgements"
                    }, e = (o.create(e), r.push(e.id), this.bodyNodes(n, d.dom.getChildren(t), {ignore: ["title"]}));
                    h.each(e, function (t) {
                        r.push(t.id)
                    })
                }, this), r
            }, this.extractNotes = function () {
                return []
            }, this.__ignoreCustomMetaNames = [], this.extractCustomMetaGroup = function (t, e) {
                var n = [], r = t.doc, o = e.querySelectorAll("article-meta-group custom-meta");
                if (0 === o.length) return n;
                for (var i = 0; i < o.length; i++) {
                    var s, a = o[i], c = a.querySelector("meta-name"), a = a.querySelector("meta-value");
                    h.include(this.__ignoreCustomMetaNames, c.textContent) || ((s = {
                        type: "heading",
                        id: t.nextId("heading"),
                        level: 3,
                        content: ""
                    }).content = this.annotatedText(t, c, [s.id, "content"]), r.create(s), c = this.paragraphGroup(t, a), n.push(s.id), n = n.concat(h.pluck(c, "id")))
                }
                return n
            }, this.extractCopyrightAndLicense = function (t, e) {
                var n = [], r = t.doc, e = e.querySelector("permissions");
                if (e) for (var o, i = {
                    type: "heading",
                    id: t.nextId("heading"),
                    level: 3,
                    content: "Copyright & License"
                }, i = (r.create(i), n.push(i.id), e.querySelector("copyright-statement")), s = (i && (o = this.paragraphGroup(t, i)) && o.length && (n = n.concat(h.map(o, function (t) {
                    return t.id
                })), "." !== i.textContent.trim().slice(-1) && (i = h.last(h.last(o).children), r.nodes[i].content += ". ")), e.querySelectorAll("license")), a = 0; a < s.length; a++) if ((1 == s[a].length || "en" == s[a].getAttribute("xml:lang")) && s[a]) for (var c = s[a].firstElementChild; c; c = c.nextElementSibling) {
                    var u = d.dom.getNodeType(c);
                    "p" !== u && "license-p" !== u || (o = this.paragraphGroup(t, c)) && o.length && (n = n.concat(h.pluck(o, "id")))
                }
                return n
            }, this.extractCover = function (r, t) {
                var o = r.doc, e = o.get("document"), n = t.querySelector("article-meta"), n = this._abstract(r, n),
                    i = {id: "cover", type: "cover", title: e.title, authors: [], abstract: void 0 !== n ? n.id : ""},
                    s = !1;
                h.each(e.authors, function (t) {
                    o.get(t).contributor_type.toLowerCase() === "Translator".toLowerCase() && (s = !0)
                }, this), h.each(e.authors, function (t) {
                    var e = o.get(t), n = e.name, e = (!0 === s && (n += "(" + e.contributor_type + ")"), {
                        id: "text_" + t + "_reference",
                        type: "text",
                        content: n
                    }), e = (o.create(e), i.authors.push(e.id), {
                        id: r.nextId("contributor_reference"),
                        type: "contributor_reference",
                        path: ["text_" + t + "_reference", "content"],
                        range: [0, n.length],
                        target: t
                    });
                    o.create(e)
                }, this), this.enhanceCover(r, i, t), o.create(i), o.show("content", i.id, 0)
            }, this.contribGroup = function (t, e) {
                for (var n = [], r = e.querySelectorAll("contrib"), o = 0; o < r.length; o++) {
                    var i = this.contributor(t, r[o]);
                    n.push(i)
                }
                var s = t.doc, e = e.querySelector("on-behalf-of");
                return e && (s.on_behalf_of = e.textContent.trim()), n
            }, this.affiliation = function (t, e) {
                var n = t.doc, r = e.querySelector("institution"), o = e.querySelector("country"),
                    i = e.querySelector("label"),
                    s = e.querySelector("addr-line named-content[content-type=department]"),
                    a = e.querySelector("addr-line named-content[content-type=city]"), t = {
                        id: t.nextId("affiliation"),
                        type: "affiliation",
                        source_id: e.getAttribute("id"),
                        label: i ? i.textContent : null,
                        department: s ? s.textContent : null,
                        city: a ? a.textContent : null,
                        institution: r ? r.textContent : null,
                        country: o ? o.textContent : null
                    };
                n.create(t)
            }, this.contributor = function (n, t) {
                var e = n.doc, r = n.nextId("contributor"), o = {
                        id: r,
                        source_id: t.getAttribute("id"),
                        type: "contributor",
                        name: "",
                        affiliations: [],
                        fundings: [],
                        bio: [],
                        image: "",
                        deceased: !1,
                        emails: [],
                        contribution: "",
                        members: []
                    }, i = t.getAttribute("contrib-type"),
                    i = (o.contributor_type = this._contribTypeMapping[i], t.querySelector("role")),
                    i = (i && (o.role = i.textContent), t.querySelector("bio")),
                    i = (i && h.each(d.dom.getChildren(i), function (t) {
                        var e = t.querySelector("graphic");
                        e ? (e = e.getAttribute("xlink:href"), o.image = e) : 0 < (e = this.paragraphGroup(n, t)).length && (o.bio = [e[0].id])
                    }, this), "yes" === t.getAttribute("deceased") && (o.deceased = !0), t.querySelector("uri[content-type=orcid]")),
                    i = (i && (o.orcid = i.getAttribute("xlink:href")), t.querySelector("name"));
                return i ? o.name = this.getName(i) : (i = t.querySelector("collab"), o.name = i ? i.textContent : "N/A"), this.extractContributorProperties(n, t, o), 0 === o.affiliations.length && (o.affiliations = n.affiliations), 1 < o.competing_interests.length && (o.competing_interests = h.filter(o.competing_interests, function (t) {
                    return t.indexOf("no competing") < 0
                })), "author" === t.getAttribute("contrib-type") && e.nodes.document.authors.push(r), "editor" === t.getAttribute("contrib-type") && e.nodes.document.authors.push(r), "translator" === t.getAttribute("contrib-type") && e.nodes.document.authors.push(r), "section-editor" === t.getAttribute("contrib-type") && e.nodes.document.authors.push(r), "section-author" === t.getAttribute("contrib-type") && e.nodes.document.authors.push(r), "chapter-author" === t.getAttribute("contrib-type") && e.nodes.document.authors.push(r), e.create(o), e.show("info", o.id), o
            }, this._getEqualContribs = function (t, e, n) {
                var r = [], t = t.xmlDoc.querySelectorAll("xref[rid=" + n + "]");
                return h.each(t, function (t) {
                    t = t.parentNode;
                    t !== e && r.push(this.getName(t.querySelector("name")))
                }, this), r
            }, this.extractContributorProperties = function (i, s, a) {
                var c = i.doc, u = [], l = [], t = s.querySelectorAll("xref"), t = (h.each(t, function (t) {
                    if ("aff" === t.getAttribute("ref-type")) {
                        var e = t.getAttribute("rid"), n = c.getNodeBySourceId(e);
                        n && (a.affiliations.push(n.id), i.used[e] = !0)
                    } else if ("other" === t.getAttribute("ref-type")) {
                        console.log("FIXME: please add documentation about using 'other' as indicator for extracting an awardGroup.");
                        var n = i.xmlDoc.getElementById(t.getAttribute("rid"));
                        n && ((e = n.querySelector("funding-source")) && (n = (n = n.querySelector("award-id")) ? ", " + n.textContent : "", e = e.childNodes[0].textContent, a.fundings.push([e, n].join(""))))
                    } else if ("corresp" === t.getAttribute("ref-type")) {
                        var e = t.getAttribute("rid"), n = i.xmlDoc.getElementById(e);
                        n && ((e = n.querySelector("email")) && a.emails.push(e.textContent))
                    } else if ("fn" === t.getAttribute("ref-type")) {
                        var n = t.getAttribute("rid"), r = i.xmlDoc.getElementById(n), o = !0;
                        if (r) {
                            switch (r.getAttribute("fn-type")) {
                                case"con":
                                    a.contribution = r.textContent;
                                    break;
                                case"conflict":
                                    l.push(r.textContent.trim());
                                    break;
                                case"present-address":
                                    a.present_address = r.querySelector("p").textContent;
                                    break;
                                case"equal":
                                    console.log("FIXME: isn't fnElem.getAttribute(id) === fnId?"), u = this._getEqualContribs(i, s, r.getAttribute("id"));
                                    break;
                                case"other":
                                    console.log("FIXME: isn't fnElem.getAttribute(id) === fnId?"), 0 <= r.getAttribute("id").indexOf("equal-contrib") ? u = this._getEqualContribs(i, s, r.getAttribute("id")) : o = !1;
                                    break;
                                default:
                                    o = !1
                            }
                            o && (i.used[n] = !0)
                        }
                    } else console.log("Skipping contrib's xref", t.textContent)
                }, this), 1 < l.length && (l = h.filter(l, function (t) {
                    return t.indexOf("no competing") < 0
                })), a.competing_interests = l, s.querySelector("xref[ref-type=other]"));
                t && (t = t.getAttribute("rid"), t = i.xmlDoc.querySelectorAll("#" + t + " contrib"), a.members = h.map(t, function (t) {
                    return this.getName(t.querySelector("name"))
                }, this)), a.equal_contrib = u, a.competing_interests = l
            }, this.document = function (t, e) {
                var n = t.doc, e = e.querySelector("article");
                if (e) return this.article(t, e), this.postProcess(t), h.each(n.containers, function (t) {
                    t.rebuild()
                }), n;
                throw new o("Expected to find an 'article' element.")
            }, this.postProcess = function (t) {
                this.postProcessAnnotations(t)
            }, this.postProcessAnnotations = function (t) {
                for (var e = 0; e < t.annotations.length; e++) {
                    var n, r = t.annotations[e];
                    !r.target || (n = t.doc.getNodeBySourceId(r.target)) && (r.target = n.id), t.doc.create(t.annotations[e])
                }
            }, this.article = function (t, e) {
                var n = t.doc, r = e.querySelector("article-id"),
                    n = (n.id = r ? r.textContent : d.uuid(), this.extractDefinitions(t, e), this.extractAffilitations(t, e), this.extractContributors(t, e), this.extractCitations(t, e), this.extractFootnotes(t, e), this.extractCover(t, e), this.extractArticleMeta(t, e), this.extractPublicationInfo(t, e), e.querySelector("body"));
                n && this.body(t, n), this.extractFigures(t, e), this.enhanceArticle(t, e)
            }, this.extractDefinitions = function (n) {
                var t = n.xmlDoc.querySelectorAll("def-item");
                h.each(t, function (t) {
                    var e = t.querySelector("term"), t = t.querySelector("def"), e = {
                        id: t.id || t.getAttribute("hwp:id") || n.nextId("definition"),
                        type: "definition",
                        title: e.textContent,
                        description: t.textContent
                    };
                    n.doc.create(e), n.doc.show("definitions", e.id)
                })
            }, this.extractArticleMeta = function (t, e) {
                e = e.querySelector("article-meta");
                if (!e) throw new o("Expected element: 'article-meta'");
                var n = e.querySelectorAll("article-id"), n = (this.articleIds(t, n), e.querySelector("title-group")),
                    n = (n && this.titleGroup(t, n), e.querySelectorAll("pub-date"));
                this.pubDates(t, n)
            }, this.extractAffilitations = function (t, e) {
                for (var n = e.querySelectorAll("aff"), r = 0; r < n.length; r++) this.affiliation(t, n[r])
            }, this.extractContributors = function (t, e) {
                e = e.querySelector("contrib-group");
                e && this.contribGroup(t, e)
            }, this.extractFigures = function (t, e) {
                for (var n = e.querySelector("body").querySelectorAll("fig, table-wrap, supplementary-material, media[mimetype=video]"), r = [], o = 0; o < n.length; o++) {
                    var i, s, a = n[o];
                    a._converted || (s = null, "fig" === (i = d.dom.getNodeType(a)) ? s = this.figure(t, a) : "table-wrap" !== i && ("media" === i ? s = this.video(t, a) : "supplementary-material" === i && (s = this.supplement(t, a))), s && r.push(s))
                }
                this.show(t, r)
            }, this.extractCitations = function (t, e) {
                e = e.querySelector("ref-list");
                e && this.refList(t, e)
            }, this.extractFootnotes = function (t, e) {
                e = e.querySelector("fn-group");
                e && this.fnList(t, e)
            }, this.articleIds = function (t, e) {
                t = t.doc;
                0 < e.length ? t.id = e[0].textContent : t.id = d.uuid()
            }, this.titleGroup = function (t, e) {
                var n = t.doc, e = e.querySelector("article-title");
                e && (n.title = this.annotatedText(t, e, ["document", "title"], {ignore: ["xref"]}))
            }, this.pubDates = function (t, e) {
                var n = t.doc;
                0 < e.length && (t = this.pubDate(t, e[0]), n.created_at = t.date)
            }, this.pubDate = function (t, e) {
                var n = -1, r = -1, o = -1;
                return h.each(d.dom.getChildren(e), function (t) {
                    var e = d.dom.getNodeType(t), t = t.textContent;
                    "day" === e ? n = parseInt(t, 10) : "month" === e ? r = parseInt(t, 10) : "year" === e && (o = parseInt(t, 10))
                }, this), {date: new Date(o, r, n)}
            }, this.abstracts = function (e, t) {
                t = t.querySelectorAll("abstract");
                h.each(t, function (t) {
                    this.abstract(e, t)
                }, this)
            }, this._abstract = function (e, t) {
                var n = t.querySelector("title"), r = e.doc,
                    o = {id: e.nextId("abstract"), type: "abstract", label: "", title: "", children: []};
                if (null !== n && 0 < n.textContent.length) {
                    for (var i = new d.dom.ChildNodeIterator(n); i.hasNext();) {
                        var s, a = i.next(), a = d.dom.getNodeType(a);
                        "text" !== a && !this.isAnnotation(a) || (s = {
                            id: e.nextId("text"),
                            type: "text",
                            content: null
                        })
                    }
                    e.stack.push({path: [s.id, "content"]});
                    n = this._annotatedText(e, i.back(), {offset: 0, breakOnUnknown: !0});
                    0 < n.length && (s.content = n, r.create(s)), o.title = s.id
                }
                var c = [], n = t.querySelectorAll("p");
                return h.each(n, function (t) {
                    t = this.paragraph(e, t);
                    t && c.push(t.id)
                }, this), 0 < n.length && (o.children = c, r.create(o)), o
            }, this.body = function (t, e) {
                var n = t.doc, r = {id: t.nextId("heading"), type: "heading", level: 1, content: ""},
                    n = (n.create(r), [r].concat(this.bodyNodes(t, d.dom.getChildren(e))));
                0 < n.length && this.show(t, n)
            }, this._ignoredBodyNodes = {
                fig: !0,
                table: !0,
                speaker: !0
            }, this._bodyNodes = {}, this.bodyNodes = function (t, e, n) {
                for (var r = [], o = 0; o < e.length; o++) {
                    var i, s = e[o], a = d.dom.getNodeType(s);
                    this._bodyNodes[a] ? (i = this._bodyNodes[a].call(this, t, s), h.isArray(i) ? r = r.concat(i) : i && r.push(i)) : this._ignoredBodyNodes[a] || n && n.ignore && 0 <= n.ignore.indexOf(a) ? (i = this.ignoredNode(t, s, a)) && r.push(i) : console.warn("Node not yet supported as top-level node: " + a)
                }
                return r
            }, this._bodyNodes.p = function (t, e) {
                return this.paragraphGroup(t, e)
            }, this._bodyNodes.sec = function (t, e) {
                return this.section(t, e)
            }, this._bodyNodes.list = function (t, e) {
                return this.list(t, e)
            }, this._bodyNodes["disp-formula"] = function (t, e) {
                return this.formula(t, e)
            }, this._bodyNodes.caption = function (t, e) {
                return this.caption(t, e)
            }, this._bodyNodes["boxed-text"] = function (t, e) {
                return this.boxedText(t, e)
            }, this._bodyNodes["disp-quote"] = function (t, e) {
                return this.quoteText(t, e)
            }, this._bodyNodes.attrib = function (t, e) {
                return this.paragraphGroup(t, e)
            }, this._bodyNodes.comment = function (t, e) {
                return this.comment(t, e)
            }, this._bodyNodes.fig = function (t, e) {
                return this.figure(t, e)
            }, this._bodyNodes.speech = function (t, e) {
                return this.speechText(t, e)
            }, this._bodyNodes["table-wrap"] = function (t, e) {
                return this.tableWrap(t, e)
            }, this._bodyNodes["sec-meta"] = function (t, e) {
                return this.secMeta(t, e)
            }, this._bodyNodes.abstract = function (t, e) {
                return this._abstract(t, e)
            }, this._bodyNodes["contrib-group"] = function (t, e) {
                return this.contribGroup(t, e)
            }, this.secMeta = function (i, t) {
                var s, a = i.doc, e = a.get("document"), c = this.bodyNodes(i, d.dom.getChildren(t)), u = {
                    id: i.nextId("sec_meta"),
                    type: "sec_meta",
                    children: h.pluck(c, "id"),
                    authors: [],
                    abstract: []
                }, l = ["Section Editor", "Section Author", "Translator", "Chapter Author"], p = !1;
                return h.each(e.authors, function (t) {
                    a.get(t).contributor_type.toLowerCase() === "Translator".toLowerCase() && (p = !0)
                }, this), h.each(e.authors, function (t) {
                    var e, n, r = a.get(t), o = r.name;
                    for (!0 === p && (o += " (" + r.contributor_type + ")"), s = 0; s < l.length; s++) r.contributor_type === l[s] && (e = {
                        id: "text_" + t + "_reference",
                        type: "text",
                        content: o
                    }, n = {
                        id: i.nextId("contributor_reference"),
                        type: "contributor_reference",
                        path: ["text_" + t + "_reference", "content"],
                        range: [0, o.length],
                        target: t
                    }, h.each(c, function (t) {
                        "contributor" === t.type & t.id === r.id && (a.create(e), u.authors.push(e.id), a.create(n))
                    }, this))
                }, this), h.each(c, function (t) {
                    "abstract" === t.type && u.abstract.push(t.id)
                }, this), a.create(u), u
            }, this.ignoredNode = function () {
            }, this.comment = function () {
                return null
            }, this.boxedText = function (t, e) {
                var n = t.doc, r = this.bodyNodes(t, d.dom.getChildren(e)), t = {
                    type: "box",
                    id: t.nextId("box"),
                    source_id: e.getAttribute("id"),
                    label: "",
                    children: h.pluck(r, "id")
                };
                return n.create(t), t
            }, this.childNodes = function (t, e) {
                for (var n = [], r = 0; r < e.length; r++) {
                    var o = e[r], i = d.dom.getNodeType(o);
                    this.childNodes[i] && (i = this.childNodes[i].call(this, t, o), h.isArray(i) ? n = n.concat(i) : i && n.push(i))
                }
                return n
            }, this.speakerName = function (t, e) {
                return {type: "speaker", label: "Speaker", children: e.innerHTML}
            }, this.quoteText = function (t, e) {
                var n = t.doc, r = this.bodyNodes(t, d.dom.getChildren(e)), t = {
                    type: "quote",
                    id: t.nextId("quote"),
                    source_id: e.getAttribute("id"),
                    label: "",
                    children: h.pluck(r, "id")
                };
                return n.create(t), t
            }, this.speechText = function (t, e) {
                var n = t.doc, r = this.bodyNodes(t, d.dom.getChildren(e)), t = {
                    type: "speech",
                    id: t.nextId("speech"),
                    source_id: e.getAttribute("id"),
                    label: "",
                    speaker: e.querySelectorAll("speaker"),
                    children: h.pluck(r, "id")
                };
                return n.create(t), t
            }, this.datasets = function (t, e) {
                for (var n = [], r = 0; r < e.length; r++) {
                    var o, i = e[r];
                    "p" === d.dom.getNodeType(i) && ((o = i.querySelector("related-object")) ? n = n.concat(this.indivdata(t, o)) : 0 < (o = this.paragraphGroup(t, i)).length && n.push(o[0].id))
                }
                return n
            }, this.indivdata = function (t, e) {
                for (var n = t.doc, r = {type: "paragraph", id: t.nextId("paragraph"), children: []}, o = {
                    type: "text",
                    id: t.nextId("text"),
                    content: ""
                }, i = (r.children.push(o.id), d.dom.getChildren(e)), s = 0; s < i.length; s++) {
                    var a = i[s];
                    if ("name" === d.dom.getNodeType(a)) for (var c = d.dom.getChildren(a), u = 0; u < c.length; u++) {
                        var l, p = c[u], h = (0 === u || (l = {
                            type: "text",
                            id: t.nextId("text"),
                            content: ", "
                        }, n.create(l), r.children.push(l.id)), this.paragraphGroup(t, p));
                        r.children.push(h[0].children[0])
                    } else (h = this.paragraphGroup(t, a)) && h[0] && h[0].children && r.children.push(h[0].children[0])
                }
                return n.create(r), n.create(o), r.id
            }, this.section = function (t, e) {
                t.sectionLevel++;
                var n = t.doc, r = d.dom.getChildren(e), o = [], i = this.selectDirectChildren(e, "label")[0],
                    s = this.selectDirectChildren(e, "title")[0];
                if (s || console.warn("FIXME: every section should have a title", this.toHtml(e)), 0 < (o = o.concat(this.bodyNodes(t, r, {ignore: ["title", "label", "sec-meta"]}))).length && s) {
                    var r = t.nextId("heading"), a = {
                        id: r,
                        source_id: e.getAttribute("id"),
                        type: "heading",
                        level: t.sectionLevel,
                        content: s ? this.annotatedText(t, s, [r, "content"]) : "",
                        authors: []
                    };
                    if (1 < a.content.length) {
                        r = this.selectDirectChildren(e, "sec-meta")[0];
                        if (void 0 !== r) for (var c = r.querySelector("contrib-group").querySelectorAll("contrib"), u = 0; u < c.length; u++) {
                            var l = c[u].querySelector("name");
                            l && (l = this.getName(l), a.authors.push(l))
                        }
                    }
                    i && (a.label = i.textContent), 0 < a.content.length && (n.create(a), o.unshift(a))
                } else 0 === o.length && console.info("NOTE: skipping section without content:", s ? s.innerHTML : "no title");
                return t.sectionLevel--, o
            }, this.ignoredParagraphElements = {
                comment: !0,
                "supplementary-material": !0,
                fig: !0,
                "fig-group": !0,
                media: !0
            }, this.acceptedParagraphElements = {
                "boxed-text": {handler: "boxedText"},
                "disp-quote": {handler: "quoteText"},
                list: {handler: "list"},
                "disp-formula": {handler: "formula"},
                speech: {handler: "speechText"},
                "table-wrap": {handler: "tableWrap"}
            }, this.inlineParagraphElements = {
                "inline-graphic": !0,
                "inline-formula": !0
            }, this.segmentParagraphElements = function (t) {
                for (var e = [], n = "", r = new d.dom.ChildNodeIterator(t); r.hasNext();) {
                    var o = r.next(), i = d.dom.getNodeType(o);
                    this.ignoredParagraphElements[i] || ("text" === i || this.isAnnotation(i) || this.inlineParagraphElements[i] ? ("paragraph" !== n && (e.push({
                        handler: "paragraph",
                        nodes: []
                    }), n = "paragraph"), h.last(e).nodes.push(o)) : (this.acceptedParagraphElements[i] && e.push(h.extend({node: o}, this.acceptedParagraphElements[i])), n = i))
                }
                return e
            }, this.paragraphGroup = function (t, e) {
                for (var n = [], r = this.segmentParagraphElements(e), o = 0; o < r.length; o++) {
                    var i, s = r[o];
                    "paragraph" === s.handler ? (i = this.paragraph(t, s.nodes)) && (i.source_id = e.getAttribute("id"), i.attributes = e.attributes) : i = this[s.handler](t, s.node), i && n.push(i)
                }
                return n
            }, this.paragraph = function (t, e) {
                for (var n = t.doc, r = (t.skipWS = !0, {
                    id: t.nextId("paragraph"),
                    type: "paragraph",
                    children: null
                }), o = [], i = new d.dom.ChildNodeIterator(e); i.hasNext();) {
                    var s, a, c, u = i.next(), l = d.dom.getNodeType(u);
                    "text" === l || this.isAnnotation(l) ? (a = {
                        id: t.nextId("text"),
                        type: "text",
                        content: null
                    }, t.stack.push({path: [a.id, "content"]}), 0 < (s = this._annotatedText(t, i.back(), {
                        offset: 0,
                        breakOnUnknown: !0
                    })).length && (a.content = s, n.create(a), o.push(a)), t.stack.pop()) : "inline-graphic" === l ? (s = u.getAttribute("xlink:href"), a = {
                        id: t.nextId("image"),
                        type: "image",
                        url: this.resolveURL(t, s)
                    }, n.create(a), o.push(a)) : "inline-formula" === l && ((c = this.formula(t, u, "inline")) ? o.push(c) : "table-wrap" === l && this.tableWrap(t, u))
                }
                return 0 === o.length ? null : (r.children = h.map(o, function (t) {
                    return t.id
                }), n.create(r), r)
            }, this.list = function (t, e) {
                var n = t.doc, r = {
                        id: t.nextId("list"),
                        source_id: e.getAttribute("id"),
                        type: "list",
                        items: [],
                        item_ids: [],
                        ordered: !1,
                        list_type: ""
                    }, o = e.getAttribute("list-type"),
                    i = ["alpha-lower", "alpha-upper", "ordered", "roman-lower", "roman-upper"];
                for (a = 0; a < i.length; a++) o === i[a] && (r.ordered = !0);
                r.list_type = e.getAttribute("list-type");
                for (var s = e.querySelectorAll("list-item"), a = 0; a < s.length; a++) {
                    var c = s[a];
                    if (c.parentNode === e) for (var u = this.bodyNodes(t, d.dom.getChildren(c)), l = 0; l < u.length; l++) r.items.push(u[l].id), r.item_ids.push(a)
                }
                return n.create(r), r
            }, this.figure = function (t, e) {
                var n = t.doc, r = {
                        type: "figure",
                        id: t.nextId("figure"),
                        source_id: e.getAttribute("id"),
                        label: "Figure",
                        url: "",
                        caption: null
                    }, o = e.querySelector("label"),
                    o = (o && (r.label = this.annotatedText(t, o, [r.id, "label"])), e.querySelector("caption")),
                    o = (!o || (o = this.caption(t, o)) && (r.caption = o.id), e.querySelector("attrib")),
                    o = (o && (r.attrib = o.textContent), e.getAttribute("position"));
                return o && (r.position = o || ""), this.enhanceFigure(t, r, e), n.create(r), e._converted = !0, r
            }, this.supplement = function (t, e) {
                var n = t.doc, r = e.querySelector("label"), o = e.querySelector("media"),
                    o = o ? o.getAttribute("xlink:href") : null,
                    i = (i = e.querySelector("object-id[pub-id-type='doi']")) ? i.textContent : "", i = {
                        id: t.nextId("supplement"),
                        source_id: e.getAttribute("id"),
                        type: "supplement",
                        label: r ? r.textContent : "",
                        url: o,
                        caption: null
                    }, r = e.querySelector("caption");
                return r && (o = this.caption(t, r)) && (i.caption = o.id), this.enhanceSupplement(t, i, e), n.create(i), i
            }, this.caption = function (e, n) {
                var t = e.doc, r = {
                        id: e.nextId("caption"),
                        source_id: n.getAttribute("id"),
                        type: "caption",
                        title: "",
                        children: []
                    }, o = n.querySelector("title"), i = (!o || (o = this.paragraph(e, o)) && (r.title = o.id), []),
                    o = n.querySelectorAll("p");
                return h.each(o, function (t) {
                    t.parentNode === n && (t = this.paragraph(e, t)) && i.push(t.id)
                }, this), r.children = i, t.create(r), r
            }, this.video = function (t, e) {
                var n = t.doc, r = e.querySelector("label").textContent, r = {
                        id: t.nextId("video"),
                        source_id: e.getAttribute("id"),
                        type: "video",
                        label: r,
                        title: "",
                        caption: null,
                        poster: ""
                    }, o = e.querySelector("caption"),
                    o = (!o || (o = this.caption(t, o)) && (r.caption = o.id), e.querySelector("object-id"));
                return o && "poster" === o.getAttribute("specific-use") && (r.poster = o.textContent), this.enhanceVideo(t, r, e), n.create(r), r
            }, this.tableWrap = function (t, e) {
                for (var n = t.doc, r = e.querySelector("label"), o = e.querySelector("table"), i = {}, s = {}, a = {}, c = o.children, u = 0; u < c.length; u++) {
                    for (var l = c[u].children, p = 0; p < l.length; p++) {
                        for (var h = l[p].childNodes, d = 0; d < h.length; d++) {
                            var f, g, y = h[d];
                            a[d] = {}, "#text" === y.nodeName ? 0 < (g = y.data.trim()).length && (f = document.createElement("p"), g = document.createTextNode(g), f.appendChild(g), a[d].nodes = this.paragraphGroup(t, f)) : "p" === y.nodeName && (a[d].nodes = this.paragraphGroup(t, y)), a[d].attributes = l[p].attributes
                        }
                        s[p] = a, a = {}
                    }
                    i[u] = s, s = {}
                }
                r = {
                    id: t.nextId("table"),
                    source_id: e.getAttribute("id"),
                    type: "table",
                    title: "",
                    label: r ? r.textContent : "Table",
                    children: i,
                    table_attributes: o.attributes,
                    caption: null,
                    footers: []
                };
                return this.extractTableCaption(t, r, e), n.create(r), r
            }, this.extractTableCaption = function (t, e, n) {
                var r = n.querySelector("caption");
                r ? (t = this.caption(t, r)) && (e.caption = t.id) : console.warn("caption node not found for", n)
            }, this._getFormulaData = function (t) {
                for (var e = [], n = t.firstElementChild; n; n = n.nextElementSibling) {
                    var r = d.dom.getNodeType(n);
                    switch (r) {
                        case"graphic":
                        case"inline-graphic":
                            e.push({format: "image", data: n.getAttribute("xlink:href")});
                            break;
                        case"svg":
                            e.push({format: "svg", data: this.toHtml(n)});
                            break;
                        case"mml:math":
                        case"math":
                            e.push({format: "mathml", data: this.mmlToHtmlString(n)});
                            break;
                        case"tex-math":
                            e.push({format: "latex", data: n.textContent});
                            break;
                        case"label":
                            break;
                        default:
                            console.warn("Unsupported formula element of type " + r)
                    }
                }
                return e
            }, this.formula = function (t, e, n) {
                for (var r = t.doc, o = {
                    id: t.nextId("formula"),
                    source_id: e.getAttribute("id"),
                    type: "formula",
                    label: "",
                    inline: !!n,
                    data: [],
                    format: []
                }, t = e.querySelector("label"), i = (t && (o.label = t.textContent), this._getFormulaData(e, n)), s = 0; s < i.length; s++) o.format.push(i[s].format), o.data.push(i[s].data);
                return r.create(o), o
            }, this.fnList = function (t, e) {
                for (var n = e.querySelectorAll("fn"), r = 0; r < n.length; r++) this.fn(t, n[r])
            }, this.rererenceTypes = {p: !0}, this.fn = function (t, e) {
                var n = d.dom.getChildren(e);
                null !== n && this.footnote(t, e, n)
            }, this.footnote = function (t, e, n) {
                for (var r, o, i = t.doc, s = [], a = t.nextId("article_footnote"), c = 0; c < n.length; c++) {
                    var u = n[c];
                    s.push(this.segmentParagraphElements(u))
                }
                for (e = {
                    id: a,
                    source_id: e.getAttribute("id"),
                    type: "footnote",
                    text: "N/A",
                    label: "",
                    authors: [],
                    doi: "",
                    source: "",
                    volume: "",
                    fpage: "",
                    lpage: "",
                    citation_urls: []
                }, r = 0; r < s.length; r++) for (var l = s[r], p = 0; p < l.length; p++) {
                    var h, d = l[p].nodes;
                    if (void 0 !== d) for (o = 0; o < d.length; o++) "xref" == d[o].tagName && (h = d[o].getAttribute("rid"), void 0 !== (h = t.doc.getNodeBySourceId(h)) && (d[o].target = h.properties.id))
                }
                return e.text = s, i.create(e), i.show("footnotes", a), e
            }, this.citationTypes = {"mixed-citation": !0, "element-citation": !0}, this.refList = function (t, e) {
                for (var n = e.querySelectorAll("ref"), r = 0; r < n.length; r++) this.ref(t, n[r])
            }, this.ref = function (t, e) {
                for (var n = d.dom.getChildren(e), r = 0; r < n.length; r++) {
                    var o = n[r], i = d.dom.getNodeType(o);
                    this.citationTypes[i] ? this.citation(t, e, o) : "label" !== i && console.warn("Not supported in 'ref': ", i)
                }
            }, this.citation = function (t, e, n) {
                var r = t.doc, o = t.nextId("article_citation"), i = n.querySelector("person-group"), s = {
                    id: o,
                    source_id: e.getAttribute("id"),
                    type: "citation",
                    title: "N/A",
                    label: "",
                    authors: [],
                    doi: "",
                    source: "",
                    volume: "",
                    fpage: "",
                    lpage: "",
                    citation_urls: []
                };
                if (i) {
                    var a = i.querySelectorAll("name");
                    for (u = 0; u < a.length; u++) s.authors.push(this.getName(a[u]));
                    var c = i.querySelectorAll("collab");
                    for (u = 0; u < c.length; u++) s.authors.push(c[u].textContent)
                }
                var u, i = n.querySelector("source"),
                    l = (i && (s.source = i.textContent), n.querySelector("article-title,p")),
                    l = (l ? s.title = this.annotatedText(t, l, [o, "title"]) : (l = n.querySelector("comment")) ? s.title = this.annotatedText(t, l, [o, "title"]) : i ? s.title = this.annotatedText(t, i, [o, "title"]) : console.warn("FIXME: this citation has no title", n), n.querySelector("volume")),
                    t = (l && (s.volume = l.textContent), n.querySelector("publisher-loc")),
                    i = (t && (s.publisher_location = t.textContent), n.querySelector("publisher-name")),
                    l = (i && (s.publisher_name = i.textContent), n.querySelector("fpage")),
                    t = (l && (s.fpage = l.textContent), n.querySelector("lpage")),
                    i = (t && (s.lpage = t.textContent), n.querySelector("year")),
                    l = (i && (s.year = i.textContent), e.querySelector("label")),
                    t = (l && (s.label = l.textContent), n.querySelector("pub-id[pub-id-type='doi'], ext-link[ext-link-type='doi']"));
                return t && (s.doi = t.textContent), r.create(s), r.show("citations", o), s
            }, this.back = function () {
                return null
            }, this.createAnnotation = function (t, e, n, r) {
                var o;
                n !== r && (o = e.tagName.toLowerCase(), n = {
                    type: "annotation",
                    path: h.last(t.stack).path,
                    range: [n, r]
                }, this.addAnnotationData(t, n, e, o), this.enhanceAnnotationData(t, n, e, o), n.id = t.nextId(n.type), t.annotations.push(n))
            }, this.addAnnotationData = function (t, e, n, r) {
                var o;
                e.type = this._annotationTypes[r] || "annotation", "xref" === r ? this.addAnnotationDataForXref(t, e, n) : "ext-link" === r || "uri" === r ? (e.url = n.getAttribute("xlink:href"), o = n.getAttribute("ext-link-type") || "", "uri" !== r && "uri" !== o.toLowerCase() || /^\w+:\/\//.exec(e.url) || /^\//.exec(e.url) ? o.toLowerCase() : e.url = "http://" + e.url) : "email" === r ? e.url = "mailto:" + n.textContent.trim() : "inline-graphic" === r ? e.url = n.getAttribute("xlink:href") : "inline-formula" === r && (o = this.formula(t, n, "inline"), e.target = o.id)
            }, this.addAnnotationDataForXref = function (t, e, n) {
                var r = n.getAttribute("ref-type"), n = n.getAttribute("rid");
                e.type = this._refTypeMapping[r] || "cross_reference", n && (e.target = n)
            }, this.annotatedText = function (t, e, n, r) {
                t.stack.push({path: n, ignore: (r = r || {}).ignore});
                n = new d.dom.ChildNodeIterator(e), e = this._annotatedText(t, n, r);
                return t.stack.pop(), e
            }, this._annotatedText = function (t, e, n) {
                for (var r = "", o = void 0 === n.offset ? 0 : n.offset, i = !!n.nested, s = !!n.breakOnUnknown; e.hasNext();) {
                    var a = e.next();
                    if (a.nodeType === Node.TEXT_NODE) {
                        var c = t.acceptText(a.textContent);
                        r += c, o += c.length
                    } else {
                        var u, l, c = d.dom.getNodeType(a);
                        if (this.isAnnotation(c)) t.top().ignore.indexOf(c) < 0 && (u = o, r += l = this._annotationTextHandler[c] ? this._annotationTextHandler[c].call(this, t, a, c, o) : this._getAnnotationText(t, a, c, o), o += l.length, t.ignoreAnnotations || this.createAnnotation(t, a, u, o)); else if (s) {
                            if (!i) {
                                e.back();
                                break
                            }
                            console.warn("Node not yet supported in annoted text: " + c)
                        } else t.top().ignore.indexOf(c) < 0 && (r += l = this._getAnnotationText(t, a, c, o), o += l.length)
                    }
                }
                return r
            }, this._annotationTextHandler = {}, this._getAnnotationText = function (t, e, n, r) {
                e = new d.dom.ChildNodeIterator(e);
                return this._annotatedText(t, e, {offset: r, nested: !0})
            }, this._annotationTextHandler["ext-link"] = function (t, e, n, r) {
                r = this._getAnnotationText(t, e, r);
                return r = "ext-link" === n && e.getAttribute("xlink:href") === r.trim() ? this.shortenLinkLabel(t, r) : r
            }, this._annotationTextHandler["inline-formula"] = function (t) {
                return t.acceptText("{{inline-formula}}")
            }, this.shortenLinkLabel = function (t, e) {
                var n, r, o;
                return e = 50 < e.length ? (r = /((?:\w+:\/\/)?[\/]?[^\/]+[\/]?)(.*)/.exec(e)) ? (n = r[1] || "", r = r[2] || "", 40 < n.length ? n.substring(0, 40) + "..." + r.substring(r.length - 10 - 3) : (o = Math.max(50 - n.length - 3, 7), n + "..." + r.substring(r.length - o))) : e.substring(0, 40) + "..." + e.substring(e.length - 10 - 3) : e
            }, this.getBaseURL = function (t) {
                return t.xmlDoc.querySelector("article").getAttribute("xml:base") || t.options.baseURL
            }, this.enhanceArticle = function (t, e) {
            }, this.enhanceCover = function (t, e, n) {
            }, this.enhanceFigure = function (t, e, n) {
                n = n.querySelector("graphic").getAttribute("xlink:href");
                e.url = this.resolveURL(t, n)
            }, this.enhancePublicationInfo = function (t, e, n) {
            }, this.enhanceSupplement = function (t, e, n) {
            }, this.enhanceTable = function (t, e, n) {
            }, this.enhanceVideo = function (t, e, n) {
                n = n.getAttribute("xlink:href");
                e.url = n
            },this.resolveURL = function (t, e) {
                return e.match(/http:/) ? e : [t.options.baseURL, e].join("")
            },this.viewMapping = {
                box: "content",
                supplement: "figures",
                figure: "figures",
                video: "figures"
            },this.enhanceAnnotationData = function (t, e, n, r) {
            },this.showNode = function (t, e) {
                var n = this.viewMapping[e.type] || "content";
                t.doc.show(n, e.id)
            }
        }, r.State = function (t, e, n) {
            var r = this,
                o = (this.xmlDoc = e, this.doc = n, this.options = t.options, this.annotations = [], this.stack = [], this.sectionLevel = 1, this.affiliations = [], {}),
                i = (this.nextId = function (t) {
                    return o[t] = o[t] || 0, o[t]++, t + "_" + o[t]
                }, this.used = {}, /^\s+/g), s = /^\s*/g, a = /\s+$/g, c = /\s+/g, u = /[\t\n\r]+/g;
            this.lastChar = "", this.skipWS = !1, this.acceptText = function (t) {
                return this.options.TRIM_WHITESPACES && (t = t.replace(u, ""), t = " " === this.lastChar || this.skipWS ? t.replace(s, "") : t.replace(i, " "), this.skipWS = !1, t = t.replace(a, " "), this.options.REMOVE_INNER_WS && (t = t.replace(c, " ")), this.lastChar = t[t.length - 1] || this.lastChar), t
            }, this.top = function () {
                var t = h.last(r.stack);
                return (t = t || {}).ignore = t.ignore || [], t
            }
        }, ((r.prototype = new r.Prototype).constructor = r).DefaultOptions = {
            TRIM_WHITESPACES: !0,
            REMOVE_INNER_WS: !0
        }, e.exports = r
    }, {"../article": 5, "../substance/util": 182, underscore: 130}],
    130: [function (t, F, D) {
        !function () {
            function t(c, u) {
                return function (t) {
                    var e = arguments.length;
                    if (e < 2 || null == t) return t;
                    for (var n = 1; n < e; n++) for (var r = arguments[n], o = c(r), i = o.length, s = 0; s < i; s++) {
                        var a = o[s];
                        u && void 0 !== t[a] || (t[a] = r[a])
                    }
                    return t
                }
            }

            function e(e) {
                return function (t) {
                    return null == t ? void 0 : t[e]
                }
            }

            var n = this, r = n._, o = Array.prototype, s = Object.prototype, i = Function.prototype, a = o.push,
                c = o.slice, l = s.toString, u = s.hasOwnProperty, p = Array.isArray, h = Object.keys, d = i.bind,
                f = Object.create, g = function () {
                }, y = function (t) {
                    return t instanceof y ? t : this instanceof y ? void (this._wrapped = t) : new y(t)
                },
                m = (void 0 !== D ? (D = void 0 !== F && F.exports ? F.exports = y : D)._ = y : n._ = y, y.VERSION = "1.8.3", function (o, i, t) {
                    if (void 0 === i) return o;
                    switch (null == t ? 3 : t) {
                        case 1:
                            return function (t) {
                                return o.call(i, t)
                            };
                        case 2:
                            return function (t, e) {
                                return o.call(i, t, e)
                            };
                        case 3:
                            return function (t, e, n) {
                                return o.call(i, t, e, n)
                            };
                        case 4:
                            return function (t, e, n, r) {
                                return o.call(i, t, e, n, r)
                            }
                    }
                    return function () {
                        return o.apply(i, arguments)
                    }
                }), v = function (t, e, n) {
                    return null == t ? y.identity : y.isFunction(t) ? m(t, e, n) : y.isObject(t) ? y.matcher(t) : y.property(t)
                }, b = (y.iteratee = function (t, e) {
                    return v(t, e, 1 / 0)
                }, function (t) {
                    if (!y.isObject(t)) return {};
                    if (f) return f(t);
                    g.prototype = t;
                    t = new g;
                    return g.prototype = null, t
                }), M = Math.pow(2, 53) - 1, w = e("length"), _ = function (t) {
                    t = w(t);
                    return "number" == typeof t && 0 <= t && t <= M
                };

            function x(f) {
                return function (t, e, n, r) {
                    e = m(e, r, 4);
                    for (var o = !_(t) && y.keys(t), i = (o || t).length, s = 0 < f ? 0 : i - 1, a = (arguments.length < 3 && (n = t[o ? o[s] : s], s += f), t), c = e, u = n, l = o, p = s, h = i; 0 <= p && p < h; p += f) {
                        var d = l ? l[p] : p;
                        u = c(u, a[d], d, a)
                    }
                    return u
                }
            }

            y.each = y.forEach = function (t, e, n) {
                if (e = m(e, n), _(t)) for (o = 0, i = t.length; o < i; o++) e(t[o], o, t); else for (var r = y.keys(t), o = 0, i = r.length; o < i; o++) e(t[r[o]], r[o], t);
                return t
            }, y.map = y.collect = function (t, e, n) {
                e = v(e, n);
                for (var r = !_(t) && y.keys(t), o = (r || t).length, i = Array(o), s = 0; s < o; s++) {
                    var a = r ? r[s] : s;
                    i[s] = e(t[a], a, t)
                }
                return i
            }, y.reduce = y.foldl = y.inject = x(1), y.reduceRight = y.foldr = x(-1), y.find = y.detect = function (t, e, n) {
                e = _(t) ? y.findIndex(t, e, n) : y.findKey(t, e, n);
                if (void 0 !== e && -1 !== e) return t[e]
            }, y.filter = y.select = function (t, r, e) {
                var o = [];
                return r = v(r, e), y.each(t, function (t, e, n) {
                    r(t, e, n) && o.push(t)
                }), o
            }, y.reject = function (t, e, n) {
                return y.filter(t, y.negate(v(e)), n)
            }, y.every = y.all = function (t, e, n) {
                e = v(e, n);
                for (var r = !_(t) && y.keys(t), o = (r || t).length, i = 0; i < o; i++) {
                    var s = r ? r[i] : i;
                    if (!e(t[s], s, t)) return !1
                }
                return !0
            }, y.some = y.any = function (t, e, n) {
                e = v(e, n);
                for (var r = !_(t) && y.keys(t), o = (r || t).length, i = 0; i < o; i++) {
                    var s = r ? r[i] : i;
                    if (e(t[s], s, t)) return !0
                }
                return !1
            }, y.contains = y.includes = y.include = function (t, e, n, r) {
                return _(t) || (t = y.values(t)), 0 <= y.indexOf(t, e, n = "number" == typeof n && !r ? n : 0)
            }, y.invoke = function (t, n) {
                var r = c.call(arguments, 2), o = y.isFunction(n);
                return y.map(t, function (t) {
                    var e = o ? n : t[n];
                    return null == e ? e : e.apply(t, r)
                })
            }, y.pluck = function (t, e) {
                return y.map(t, y.property(e))
            }, y.where = function (t, e) {
                return y.filter(t, y.matcher(e))
            }, y.findWhere = function (t, e) {
                return y.find(t, y.matcher(e))
            }, y.max = function (t, r, e) {
                var n, o, i = -1 / 0, s = -1 / 0;
                if (null == r && null != t) for (var a = 0, c = (t = _(t) ? t : y.values(t)).length; a < c; a++) n = t[a], i < n && (i = n); else r = v(r, e), y.each(t, function (t, e, n) {
                    o = r(t, e, n), (s < o || o === -1 / 0 && i === -1 / 0) && (i = t, s = o)
                });
                return i
            }, y.min = function (t, r, e) {
                var n, o, i = 1 / 0, s = 1 / 0;
                if (null == r && null != t) for (var a = 0, c = (t = _(t) ? t : y.values(t)).length; a < c; a++) (n = t[a]) < i && (i = n); else r = v(r, e), y.each(t, function (t, e, n) {
                    ((o = r(t, e, n)) < s || o === 1 / 0 && i === 1 / 0) && (i = t, s = o)
                });
                return i
            }, y.shuffle = function (t) {
                for (var e, n = _(t) ? t : y.values(t), r = n.length, o = Array(r), i = 0; i < r; i++) (e = y.random(0, i)) !== i && (o[i] = o[e]), o[e] = n[i];
                return o
            }, y.sample = function (t, e, n) {
                return null == e || n ? (t = _(t) ? t : y.values(t))[y.random(t.length - 1)] : y.shuffle(t).slice(0, Math.max(0, e))
            }, y.sortBy = function (t, r, e) {
                return r = v(r, e), y.pluck(y.map(t, function (t, e, n) {
                    return {value: t, index: e, criteria: r(t, e, n)}
                }).sort(function (t, e) {
                    var n = t.criteria, r = e.criteria;
                    if (n !== r) {
                        if (r < n || void 0 === n) return 1;
                        if (n < r || void 0 === r) return -1
                    }
                    return t.index - e.index
                }), "value")
            };

            function C(i) {
                return function (n, r, t) {
                    var o = {};
                    return r = v(r, t), y.each(n, function (t, e) {
                        e = r(t, e, n);
                        i(o, t, e)
                    }), o
                }
            }

            y.groupBy = C(function (t, e, n) {
                y.has(t, n) ? t[n].push(e) : t[n] = [e]
            }), y.indexBy = C(function (t, e, n) {
                t[n] = e
            }), y.countBy = C(function (t, e, n) {
                y.has(t, n) ? t[n]++ : t[n] = 1
            }), y.toArray = function (t) {
                return t ? y.isArray(t) ? c.call(t) : _(t) ? y.map(t, y.identity) : y.values(t) : []
            }, y.size = function (t) {
                return null == t ? 0 : (_(t) ? t : y.keys(t)).length
            }, y.partition = function (t, r, e) {
                r = v(r, e);
                var o = [], i = [];
                return y.each(t, function (t, e, n) {
                    (r(t, e, n) ? o : i).push(t)
                }), [o, i]
            }, y.first = y.head = y.take = function (t, e, n) {
                if (null != t) return null == e || n ? t[0] : y.initial(t, t.length - e)
            }, y.initial = function (t, e, n) {
                return c.call(t, 0, Math.max(0, t.length - (null == e || n ? 1 : e)))
            }, y.last = function (t, e, n) {
                if (null != t) return null == e || n ? t[t.length - 1] : y.rest(t, Math.max(0, t.length - e))
            }, y.rest = y.tail = y.drop = function (t, e, n) {
                return c.call(t, null == e || n ? 1 : e)
            }, y.compact = function (t) {
                return y.filter(t, y.identity)
            };
            var P = function (t, e, n, r) {
                for (var o = [], i = 0, s = r || 0, a = w(t); s < a; s++) {
                    var c = t[s];
                    if (_(c) && (y.isArray(c) || y.isArguments(c))) {
                        var u = 0, l = (c = e ? c : P(c, e, n)).length;
                        for (o.length += l; u < l;) o[i++] = c[u++]
                    } else n || (o[i++] = c)
                }
                return o
            };

            function N(i) {
                return function (t, e, n) {
                    e = v(e, n);
                    for (var r = w(t), o = 0 < i ? 0 : r - 1; 0 <= o && o < r; o += i) if (e(t[o], o, t)) return o;
                    return -1
                }
            }

            function k(i, s, a) {
                return function (t, e, n) {
                    var r = 0, o = w(t);
                    if ("number" == typeof n) 0 < i ? r = 0 <= n ? n : Math.max(n + o, r) : o = 0 <= n ? Math.min(n + 1, o) : n + o + 1; else if (a && n && o) return t[n = a(t, e)] === e ? n : -1;
                    if (e != e) return 0 <= (n = s(c.call(t, r, o), y.isNaN)) ? n + r : -1;
                    for (n = 0 < i ? r : o - 1; 0 <= n && n < o; n += i) if (t[n] === e) return n;
                    return -1
                }
            }

            y.flatten = function (t, e) {
                return P(t, e, !1)
            }, y.without = function (t) {
                return y.difference(t, c.call(arguments, 1))
            }, y.uniq = y.unique = function (t, e, n, r) {
                y.isBoolean(e) || (r = n, n = e, e = !1), null != n && (n = v(n, r));
                for (var o = [], i = [], s = 0, a = w(t); s < a; s++) {
                    var c = t[s], u = n ? n(c, s, t) : c;
                    e ? (s && i === u || o.push(c), i = u) : n ? y.contains(i, u) || (i.push(u), o.push(c)) : y.contains(o, c) || o.push(c)
                }
                return o
            }, y.union = function () {
                return y.uniq(P(arguments, !0, !0))
            }, y.intersection = function (t) {
                for (var e = [], n = arguments.length, r = 0, o = w(t); r < o; r++) {
                    var i = t[r];
                    if (!y.contains(e, i)) {
                        for (var s = 1; s < n && y.contains(arguments[s], i); s++) ;
                        s === n && e.push(i)
                    }
                }
                return e
            }, y.difference = function (t) {
                var e = P(arguments, !0, !0, 1);
                return y.filter(t, function (t) {
                    return !y.contains(e, t)
                })
            }, y.zip = function () {
                return y.unzip(arguments)
            }, y.unzip = function (t) {
                for (var e = t && y.max(t, w).length || 0, n = Array(e), r = 0; r < e; r++) n[r] = y.pluck(t, r);
                return n
            }, y.object = function (t, e) {
                for (var n = {}, r = 0, o = w(t); r < o; r++) e ? n[t[r]] = e[r] : n[t[r][0]] = t[r][1];
                return n
            }, y.findIndex = N(1), y.findLastIndex = N(-1), y.sortedIndex = function (t, e, n, r) {
                for (var o = (n = v(n, r, 1))(e), i = 0, s = w(t); i < s;) {
                    var a = Math.floor((i + s) / 2);
                    n(t[a]) < o ? i = a + 1 : s = a
                }
                return i
            }, y.indexOf = k(1, y.findIndex, y.sortedIndex), y.lastIndexOf = k(-1, y.findLastIndex), y.range = function (t, e, n) {
                null == e && (e = t || 0, t = 0), n = n || 1;
                for (var r = Math.max(Math.ceil((e - t) / n), 0), o = Array(r), i = 0; i < r; i++, t += n) o[i] = t;
                return o
            };

            function T(t, e, n, r, o) {
                return r instanceof e ? (r = b(t.prototype), e = t.apply(r, o), y.isObject(e) ? e : r) : t.apply(n, o)
            }

            y.bind = function (t, e) {
                if (d && t.bind === d) return d.apply(t, c.call(arguments, 1));
                if (!y.isFunction(t)) throw new TypeError("Bind must be called on a function");

                function n() {
                    return T(t, n, e, this, r.concat(c.call(arguments)))
                }

                var r = c.call(arguments, 2);
                return n
            }, y.partial = function (o) {
                function i() {
                    for (var t = 0, e = s.length, n = Array(e), r = 0; r < e; r++) n[r] = s[r] === y ? arguments[t++] : s[r];
                    for (; t < arguments.length;) n.push(arguments[t++]);
                    return T(o, i, this, this, n)
                }

                var s = c.call(arguments, 1);
                return i
            }, y.bindAll = function (t) {
                var e, n, r = arguments.length;
                if (r <= 1) throw new Error("bindAll must be passed function names");
                for (e = 1; e < r; e++) t[n = arguments[e]] = y.bind(t[n], t);
                return t
            }, y.memoize = function (r, o) {
                function i(t) {
                    var e = i.cache, n = "" + (o ? o.apply(this, arguments) : t);
                    return y.has(e, n) || (e[n] = r.apply(this, arguments)), e[n]
                }

                return i.cache = {}, i
            }, y.delay = function (t, e) {
                var n = c.call(arguments, 2);
                return setTimeout(function () {
                    return t.apply(null, n)
                }, e)
            }, y.defer = y.partial(y.delay, y, 1), y.throttle = function (n, r, o) {
                function i() {
                    l = !1 === o.leading ? 0 : y.now(), u = null, c = n.apply(s, a), u || (s = a = null)
                }

                var s, a, c, u = null, l = 0;
                o = o || {};
                return function () {
                    var t = y.now(), e = (l || !1 !== o.leading || (l = t), r - (t - l));
                    return s = this, a = arguments, e <= 0 || r < e ? (u && (clearTimeout(u), u = null), l = t, c = n.apply(s, a), u || (s = a = null)) : u || !1 === o.trailing || (u = setTimeout(i, e)), c
                }
            }, y.debounce = function (e, n, r) {
                function o() {
                    var t = y.now() - c;
                    t < n && 0 <= t ? i = setTimeout(o, n - t) : (i = null, r || (u = e.apply(a, s), i || (a = s = null)))
                }

                var i, s, a, c, u;
                return function () {
                    a = this, s = arguments, c = y.now();
                    var t = r && !i;
                    return i = i || setTimeout(o, n), t && (u = e.apply(a, s), a = s = null), u
                }
            }, y.wrap = function (t, e) {
                return y.partial(e, t)
            }, y.negate = function (t) {
                return function () {
                    return !t.apply(this, arguments)
                }
            }, y.compose = function () {
                var n = arguments, r = n.length - 1;
                return function () {
                    for (var t = r, e = n[r].apply(this, arguments); t--;) e = n[t].call(this, e);
                    return e
                }
            }, y.after = function (t, e) {
                return function () {
                    if (--t < 1) return e.apply(this, arguments)
                }
            }, y.before = function (t, e) {
                var n;
                return function () {
                    return 0 < --t && (n = e.apply(this, arguments)), t <= 1 && (e = null), n
                }
            }, y.once = y.partial(y.before, 2);
            var A = !{toString: null}.propertyIsEnumerable("toString"),
                S = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];

            function V(t, e) {
                var n = S.length, r = t.constructor, o = y.isFunction(r) && r.prototype || s, i = "constructor";
                for (y.has(t, i) && !y.contains(e, i) && e.push(i); n--;) (i = S[n]) in t && t[i] !== o[i] && !y.contains(e, i) && e.push(i)
            }

            y.keys = function (t) {
                if (!y.isObject(t)) return [];
                if (h) return h(t);
                var e, n = [];
                for (e in t) y.has(t, e) && n.push(e);
                return A && V(t, n), n
            }, y.allKeys = function (t) {
                if (!y.isObject(t)) return [];
                var e, n = [];
                for (e in t) n.push(e);
                return A && V(t, n), n
            }, y.values = function (t) {
                for (var e = y.keys(t), n = e.length, r = Array(n), o = 0; o < n; o++) r[o] = t[e[o]];
                return r
            }, y.mapObject = function (t, e, n) {
                e = v(e, n);
                for (var r, o = y.keys(t), i = o.length, s = {}, a = 0; a < i; a++) s[r = o[a]] = e(t[r], r, t);
                return s
            }, y.pairs = function (t) {
                for (var e = y.keys(t), n = e.length, r = Array(n), o = 0; o < n; o++) r[o] = [e[o], t[e[o]]];
                return r
            }, y.invert = function (t) {
                for (var e = {}, n = y.keys(t), r = 0, o = n.length; r < o; r++) e[t[n[r]]] = n[r];
                return e
            }, y.functions = y.methods = function (t) {
                var e, n = [];
                for (e in t) y.isFunction(t[e]) && n.push(e);
                return n.sort()
            }, y.extend = t(y.allKeys), y.extendOwn = y.assign = t(y.keys), y.findKey = function (t, e, n) {
                e = v(e, n);
                for (var r, o = y.keys(t), i = 0, s = o.length; i < s; i++) if (e(t[r = o[i]], r, t)) return r
            }, y.pick = function (t, e, n) {
                var r, o, i = {}, s = t;
                if (null == s) return i;
                y.isFunction(e) ? (o = y.allKeys(s), r = m(e, n)) : (o = P(arguments, !1, !1, 1), r = function (t, e, n) {
                    return e in n
                }, s = Object(s));
                for (var a = 0, c = o.length; a < c; a++) {
                    var u = o[a], l = s[u];
                    r(l, u, s) && (i[u] = l)
                }
                return i
            }, y.omit = function (t, e, n) {
                var r;
                return e = y.isFunction(e) ? y.negate(e) : (r = y.map(P(arguments, !1, !1, 1), String), function (t, e) {
                    return !y.contains(r, e)
                }), y.pick(t, e, n)
            }, y.defaults = t(y.allKeys, !0), y.create = function (t, e) {
                t = b(t);
                return e && y.extendOwn(t, e), t
            }, y.clone = function (t) {
                return y.isObject(t) ? y.isArray(t) ? t.slice() : y.extend({}, t) : t
            }, y.tap = function (t, e) {
                return e(t), t
            }, y.isMatch = function (t, e) {
                var n = y.keys(e), r = n.length;
                if (null == t) return !r;
                for (var o = Object(t), i = 0; i < r; i++) {
                    var s = n[i];
                    if (e[s] !== o[s] || !(s in o)) return !1
                }
                return !0
            };

            function j(e) {
                function n(t) {
                    return e[t]
                }

                var t = "(?:" + y.keys(e).join("|") + ")", r = RegExp(t), o = RegExp(t, "g");
                return function (t) {
                    return r.test(t = null == t ? "" : "" + t) ? t.replace(o, n) : t
                }
            }

            function O(t) {
                return "\\" + L[t]
            }

            function E(t, e) {
                return t._chain ? y(e).chain() : e
            }

            var I = function (t, e, n, r) {
                    if (t === e) return 0 !== t || 1 / t == 1 / e;
                    if (null == t || null == e) return t === e;
                    t instanceof y && (t = t._wrapped), e instanceof y && (e = e._wrapped);
                    var o = l.call(t);
                    if (o !== l.call(e)) return !1;
                    switch (o) {
                        case"[object RegExp]":
                        case"[object String]":
                            return "" + t == "" + e;
                        case"[object Number]":
                            return +t != +t ? +e != +e : 0 == +t ? 1 / +t == 1 / e : +t == +e;
                        case"[object Date]":
                        case"[object Boolean]":
                            return +t == +e
                    }
                    o = "[object Array]" === o;
                    if (!o) {
                        if ("object" != typeof t || "object" != typeof e) return !1;
                        var i = t.constructor, s = e.constructor;
                        if (i !== s && !(y.isFunction(i) && i instanceof i && y.isFunction(s) && s instanceof s) && "constructor" in t && "constructor" in e) return !1
                    }
                    r = r || [];
                    for (var a = (n = n || []).length; a--;) if (n[a] === t) return r[a] === e;
                    if (n.push(t), r.push(e), o) {
                        if ((a = t.length) !== e.length) return !1;
                        for (; a--;) if (!I(t[a], e[a], n, r)) return !1
                    } else {
                        var c, u = y.keys(t), a = u.length;
                        if (y.keys(e).length !== a) return !1;
                        for (; a--;) if (c = u[a], !y.has(e, c) || !I(t[c], e[c], n, r)) return !1
                    }
                    return n.pop(), r.pop(), !0
                }, i = (y.isEqual = function (t, e) {
                    return I(t, e)
                }, y.isEmpty = function (t) {
                    return null == t || (_(t) && (y.isArray(t) || y.isString(t) || y.isArguments(t)) ? 0 === t.length : 0 === y.keys(t).length)
                }, y.isElement = function (t) {
                    return !(!t || 1 !== t.nodeType)
                }, y.isArray = p || function (t) {
                    return "[object Array]" === l.call(t)
                }, y.isObject = function (t) {
                    var e = typeof t;
                    return "function" == e || "object" == e && !!t
                }, y.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function (e) {
                    y["is" + e] = function (t) {
                        return l.call(t) === "[object " + e + "]"
                    }
                }), y.isArguments(arguments) || (y.isArguments = function (t) {
                    return y.has(t, "callee")
                }), "function" != typeof /./ && "object" != typeof Int8Array && (y.isFunction = function (t) {
                    return "function" == typeof t || !1
                }), y.isFinite = function (t) {
                    return isFinite(t) && !isNaN(parseFloat(t))
                }, y.isNaN = function (t) {
                    return y.isNumber(t) && t !== +t
                }, y.isBoolean = function (t) {
                    return !0 === t || !1 === t || "[object Boolean]" === l.call(t)
                }, y.isNull = function (t) {
                    return null === t
                }, y.isUndefined = function (t) {
                    return void 0 === t
                }, y.has = function (t, e) {
                    return null != t && u.call(t, e)
                }, y.noConflict = function () {
                    return n._ = r, this
                }, y.identity = function (t) {
                    return t
                }, y.constant = function (t) {
                    return function () {
                        return t
                    }
                }, y.noop = function () {
                }, y.property = e, y.propertyOf = function (e) {
                    return null == e ? function () {
                    } : function (t) {
                        return e[t]
                    }
                }, y.matcher = y.matches = function (e) {
                    return e = y.extendOwn({}, e), function (t) {
                        return y.isMatch(t, e)
                    }
                }, y.times = function (t, e, n) {
                    var r = Array(Math.max(0, t));
                    e = m(e, n, 1);
                    for (var o = 0; o < t; o++) r[o] = e(o);
                    return r
                }, y.random = function (t, e) {
                    return null == e && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1))
                }, y.now = Date.now || function () {
                    return (new Date).getTime()
                }, {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;"}), p = y.invert(i),
                q = (y.escape = j(i), y.unescape = j(p), y.result = function (t, e, n) {
                    e = null == t ? void 0 : t[e];
                    return y.isFunction(e = void 0 === e ? n : e) ? e.call(t) : e
                }, 0), $ = (y.uniqueId = function (t) {
                    var e = ++q + "";
                    return t ? t + e : e
                }, y.templateSettings = {
                    evaluate: /<%([\s\S]+?)%>/g,
                    interpolate: /<%=([\s\S]+?)%>/g,
                    escape: /<%-([\s\S]+?)%>/g
                }, /(.)^/), L = {"'": "'", "\\": "\\", "\r": "r", "\n": "n", "\u2028": "u2028", "\u2029": "u2029"},
                R = /\\|'|\r|\n|\u2028|\u2029/g;
            y.template = function (i, t, e) {
                t = y.defaults({}, t = !t && e ? e : t, y.templateSettings);
                var e = RegExp([(t.escape || $).source, (t.interpolate || $).source, (t.evaluate || $).source].join("|") + "|$", "g"),
                    s = 0, a = "__p+='";
                i.replace(e, function (t, e, n, r, o) {
                    return a += i.slice(s, o).replace(R, O), s = o + t.length, e ? a += "'+\n((__t=(" + e + "))==null?'':_.escape(__t))+\n'" : n ? a += "'+\n((__t=(" + n + "))==null?'':__t)+\n'" : r && (a += "';\n" + r + "\n__p+='"), t
                }), a += "';\n", a = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + (a = t.variable ? a : "with(obj||{}){\n" + a + "}\n") + "return __p;\n";
                try {
                    var n = new Function(t.variable || "obj", "_", a)
                } catch (t) {
                    throw t.source = a, t
                }

                function r(t) {
                    return n.call(this, t, y)
                }

                e = t.variable || "obj";
                return r.source = "function(" + e + "){\n" + a + "}", r
            }, y.chain = function (t) {
                t = y(t);
                return t._chain = !0, t
            };
            y.mixin = function (n) {
                y.each(y.functions(n), function (t) {
                    var e = y[t] = n[t];
                    y.prototype[t] = function () {
                        var t = [this._wrapped];
                        return a.apply(t, arguments), E(this, e.apply(y, t))
                    }
                })
            }, y.mixin(y), y.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (e) {
                var n = o[e];
                y.prototype[e] = function () {
                    var t = this._wrapped;
                    return n.apply(t, arguments), "shift" !== e && "splice" !== e || 0 !== t.length || delete t[0], E(this, t)
                }
            }), y.each(["concat", "join", "slice"], function (t) {
                var e = o[t];
                y.prototype[t] = function () {
                    return E(this, e.apply(this._wrapped, arguments))
                }
            }), y.prototype.value = function () {
                return this._wrapped
            }, y.prototype.valueOf = y.prototype.toJSON = y.prototype.value, y.prototype.toString = function () {
                return "" + this._wrapped
            }, "function" == typeof define && define.amd && define("underscore", [], function () {
                return y
            })
        }.call(this)
    }, {}],
    131: [function (t, e, n) {
        var t = t("./panels/container_panel"), r = new t({
            type: "resource",
            name: "figures",
            container: "figures",
            title: "Media",
            icon: "fa-picture-o",
            references: ["figure_reference"],
            zoom: !0
        }), o = new t({
            type: "resource",
            name: "citations",
            container: "citations",
            title: "References",
            icon: "fa-link",
            references: ["citation_reference"]
        }), i = new t({
            type: "resource",
            name: "footnotes",
            container: "footnotes",
            title: "Footnotes",
            icon: "fa-link",
            references: ["footnote_reference"]
        }), s = new t({
            type: "resource",
            name: "definitions",
            container: "definitions",
            title: "Glossary",
            icon: "fa-book",
            references: ["definition_reference"]
        }), t = new t({
            type: "resource",
            name: "info",
            container: "info",
            title: "",
            icon: "fa-info",
            references: ["contributor_reference"]
        });
        e.exports = [o, s, r, i, t]
    }, {"./panels/container_panel": 138}],
    132: [function (t, e, n) {
        var r = t("./workflows/toggle_resource_reference"), o = t("./workflows/follow_crossrefs"),
            t = t("./workflows/jump_to_top"), r = [new r, new o, new t];
        e.exports = r
    }, {
        "./workflows/follow_crossrefs": 154,
        "./workflows/jump_to_top": 155,
        "./workflows/toggle_resource_reference": 156
    }],
    133: [function (t, e, n) {
        e.exports = t("./lens")
    }, {"./lens": 134}],
    134: [function (t, e, n) {
        "use strict";

        function r(t) {
            (t = t || {}).routes = t.routes || this.getRoutes(), t.panels = t.panels || this.getPanels(), t.workflows = t.workflows || this.getWorkflows(), t.converters = this.getConverters(t.converterOptions), o.call(this, t), this.controller = t.controller || this.createController(t)
        }

        var o = t("../substance/application"), i = t("./lens_controller"), s = t("lens/converter"),
            a = t("lens/article"), c = t("./panels/resource_panel_viewfactory"), u = t("./reader_controller"),
            l = t("./reader_view"), p = t("./panels/panel"), h = t("./panels/panel_controller"),
            d = t("./panels/panel_view"), f = t("./panels/container_panel"),
            g = t("./panels/container_panel_controller"), y = t("./panels/container_panel_view"),
            m = t("./workflows/workflow"), v = t("./default_panels"), b = t("./default_workflows");
        (r.Prototype = function () {
            this.start = function () {
                o.prototype.start.call(this)
            }, this.render = function () {
                this.view = this.controller.createView(), this.$el.html(this.view.render().el)
            }, this.getRoutes = function () {
                return r.getDefaultRoutes()
            }, this.getPanels = function () {
                return r.getDefaultPanels()
            }, this.getWorkflows = function () {
                return r.getDefaultWorkflows()
            }, this.getConverters = function (t) {
                return [r.getDefaultConverter(t)]
            }, this.createController = function (t) {
                return new i(t)
            }
        }).prototype = o.prototype, ((r.prototype = new r.Prototype).constructor = r).DEFAULT_ROUTES = [{
            route: ":context/:focussedNode/:fullscreen",
            name: "document-focussed-fullscreen",
            command: "openReader"
        }, {route: ":context/:focussedNode", name: "document-focussed", command: "openReader"}, {
            route: ":context",
            name: "document-context",
            command: "openReader"
        }, {route: "url/:url", name: "document", command: "openReader"}, {
            route: "",
            name: "document",
            command: "openReader"
        }], r.getDefaultRoutes = function () {
            return r.DEFAULT_ROUTES
        }, r.getDefaultPanels = function () {
            return v.slice(0)
        }, r.getDefaultWorkflows = function () {
            return b.slice(0)
        }, r.getDefaultConverter = function (t) {
            return new s(t)
        }, r.Article = a, r.ReaderController = u, r.ReaderView = l, r.Controller = i, r.LensController = i, r.Panel = p, r.PanelController = h, r.PanelView = d, r.ContainerPanel = f, r.ContainerPanelController = g, r.ContainerPanelView = y, r.ResourcePanelViewFactory = c, r.Workflow = m, e.exports = r
    }, {
        "../substance/application": 160,
        "./default_panels": 131,
        "./default_workflows": 132,
        "./lens_controller": 135,
        "./panels/container_panel": 138,
        "./panels/container_panel_controller": 139,
        "./panels/container_panel_view": 140,
        "./panels/panel": 147,
        "./panels/panel_controller": 148,
        "./panels/panel_view": 149,
        "./panels/resource_panel_viewfactory": 150,
        "./reader_controller": 152,
        "./reader_view": 153,
        "./workflows/workflow": 157,
        "lens/article": 5,
        "lens/converter": 128
    }],
    135: [function (t, e, n) {
        "use strict";

        function r(t) {
            s.call(this), this.config = t, this.Article = t.articleClass || u, this.converter = t.converter, this.converters = t.converters, this.converterOptions = o.extend({}, l.DefaultOptions, t.converterOptions), this.on("open:reader", this.openReader)
        }

        var o = t("underscore"), i = t("../substance/util"), s = t("../substance/application").Controller,
            a = t("./lens_view"), c = t("./reader_controller"), u = t("lens/article"), l = t("lens/converter");
        (r.Prototype = function () {
            this.createView = function () {
                var t = new a(this);
                return this.view = t
            }, this.importXML = function (t) {
                t = (new DOMParser).parseFromString(t, "text/xml"), t = this.convertDocument(t);
                this.createReader(t, {panel: "toc"})
            }, this.updatePath = function (t) {
                var e = [];
                e.push(t.panel), t.focussedNode && e.push(t.focussedNode), t.fullscreen && e.push("fullscreen"), window.app.router.navigate(e.join("/"), {
                    trigger: !1,
                    replace: !1
                })
            }, this.createReader = function (t, e) {
                var n = this;
                this.reader = new c(t, e, this.config), this.reader.on("state-changed", function () {
                    n.updatePath(n.reader.state)
                }), this.modifyState({context: "reader"})
            }, this.convertDocument = function (t) {
                for (var e, n = 0; !e && n < this.converters.length;) {
                    var r = this.converters[n];
                    r.test(t, this.config.document_url) && (e = r.import(t)), n += 1
                }
                if (e) return e;
                throw new Error("No suitable converter found for this document", t)
            }, this.openReader = function (t, e, n) {
                var r = this, o = {panel: t || "toc", focussedNode: e, fullscreen: !!n};
                this.reader ? this.reader.modifyState(o) : "lens_article.xml" === this.config.document_url ? (t = this.Article.describe(), r.createReader(t, o)) : (this.trigger("loading:started", "Loading"), $.get(this.config.document_url).done(function (t) {
                    t = $.isXMLDoc(t) ? r.convertDocument(t) : ("string" == typeof t && (t = $.parseJSON(t)), r.Article.fromSnapshot(t));
                    "toc" === o.panel && t.getHeadings().length <= 2 && (o.panel = "info"), r.createReader(t, o)
                }).fail(function (t) {
                    r.view.startLoading("Error during loading. Please try again."), console.error(t)
                }))
            }
        }).prototype = s.prototype, r.prototype = new r.Prototype, o.extend(r.prototype, i.Events), e.exports = r
    }, {
        "../substance/application": 160,
        "../substance/util": 182,
        "./lens_view": 137,
        "./reader_controller": 152,
        "lens/article": 5,
        "lens/converter": 128,
        underscore: 130
    }],
    136: [function (t, e, n) {
        function r(t, e) {
            i.call(this, e), this.docCtrl = t, this.options = e, this.document = t.getDocument(), this.options.viewFactory ? this.viewFactory = this.options.viewFactory : this.viewFactory = new this.document.constructor.ViewFactory(this.document.nodeTypes), this.$el.addClass("surface"), this.$nodes = $("<div>").addClass("nodes"), this.$el.append(this.$nodes)
        }

        var o = t("underscore"), i = t("../substance/application").View;
        (r.Prototype = function () {
            this.render = function () {
                return this.$nodes.html(this.build()), this
            }, this.findNodeView = function (t) {
                return this.el.querySelector("*[data-id=" + t + "]")
            }, this.build = function () {
                var n = document.createDocumentFragment(), t = (o.each(this.nodes, function (t) {
                    t.dispose()
                }), this.nodes = {}, this.docCtrl.container.getTopLevelNodes());
                return o.each(t, function (t) {
                    var e = this.renderNodeView(t);
                    this.nodes[t.id] = e, n.appendChild(e.el)
                }, this), n
            }, this.renderNodeView = function (t) {
                t = this.viewFactory.createView(t, {topLevel: !0});
                return t.render(), t
            }
        }).prototype = i.prototype, r.prototype = new r.Prototype, e.exports = r.prototype.constructor = r
    }, {"../substance/application": 160, underscore: 130}],
    137: [function (t, e, n) {
        "use strict";

        function r(t) {
            i.call(this), this.controller = t, this.$el.attr({id: "container"}), this.listenTo(this.controller, "state-changed", this.onStateChanged), this.listenTo(this.controller, "loading:started", this.startLoading), $(document).on("dragover", function () {
                return !1
            }), $(document).on("ondragend", function () {
                return !1
            }), $(document).on("drop", this.handleDroppedFile.bind(this))
        }

        var o = t("underscore"), i = t("../substance/application").View, s = t("../substance/application").$$;
        (r.Prototype = function () {
            this.handleDroppedFile = function () {
                var e = this.controller, t = event.dataTransfer.files[0], n = new FileReader;
                return n.onload = function (t) {
                    e.importXML(t.target.result)
                }, n.readAsText(t), !1
            }, this.onStateChanged = function () {
                var t = this.controller.state;
                "reader" === t.context ? this.openReader() : console.log("Unknown application state: " + t)
            }, this.startLoading = function (t) {
                t = t || "Loading", $(".spinner-wrapper .message").html(t), $("body").addClass("loading")
            }, this.stopLoading = function () {
                $("body").removeClass("loading")
            }, this.openReader = function () {
                var t = this.controller.reader.createView(), e = this;
                e.replaceMainView("reader", t), e.startLoading("Typesetting"), this.$("#main").css({opacity: 0}), o.delay(function () {
                    e.stopLoading(), e.$("#main").css({opacity: 1})
                }, 1e3)
            }, this.replaceMainView = function (t, e) {
                $("body").removeClass().addClass("current-view " + t), this.mainView && this.mainView !== e && this.mainView.dispose(), this.mainView = e, this.$("#main").html(e.render().el)
            }, this.render = function () {
                return this.el.innerHTML = "", this.el.appendChild(s(".browser-not-supported", {
                    text: "Sorry, your browser is not supported.",
                    style: "display: none;"
                })), this.el.appendChild(s(".spinner-wrapper", {children: [s(".spinner"), s(".message", {html: "Loading"})]})), this.el.appendChild(s("#main")), this
            }, this.dispose = function () {
                this.stopListening(), this.mainView && this.mainView.dispose()
            }
        }).prototype = i.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"../substance/application": 160, underscore: 130}],
    138: [function (t, e, n) {
        "use strict";

        function r(t) {
            o.call(this, t)
        }

        var o = t("./panel"), i = t("./container_panel_controller");
        (r.Prototype = function () {
            this.createController = function (t) {
                return new i(t, this.config)
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"./container_panel_controller": 139, "./panel": 147}],
    139: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            i.call(this, t, e), this.docCtrl = new o.Controller(t, {view: e.container})
        }

        var o = t("../../substance/document"), i = t("./panel_controller"), s = t("./resource_panel_viewfactory"),
            a = t("./container_panel_view");
        (r.Prototype = function () {
            this.createView = function () {
                var t = this.getDocument();
                return t = "resource" === this.config.type ? this.config.createViewFactory ? this.config.createViewFactory(t, this.config) : new s(t.nodeTypes, this.config) : new t.constructor.ViewFactory(t.nodeTypes, this.config), this.viewFactory = t, new a(this, t, this.config)
            }, this.getContainer = function () {
                return this.docCtrl.getContainer()
            }
        }).prototype = i.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {
        "../../substance/document": 173,
        "./container_panel_view": 140,
        "./panel_controller": 148,
        "./resource_panel_viewfactory": 150
    }],
    140: [function (t, e, n) {
        "use strict";

        function r(t, e, n) {
            a.call(this, t, n), this.surface = new s(t.docCtrl, {
                editable: !1,
                viewFactory: e
            }), this.docCtrl = t.docCtrl, this.scrollbar = new i(this.surface), this._onScroll = o.bind(this.onScroll, this), this.surface.$el.on("scroll", this._onScroll), this.surface.$el.addClass("resource-view").addClass(n.container), this.el.appendChild(this.surface.el), this.el.appendChild(this.scrollbar.el), this.$activeResource = null
        }

        var o = t("underscore"), i = t("./surface_scrollbar"), s = t("../lens_surface"), a = t("./panel_view"),
            c = t("../../substance/util/getRelativeBoundingRect");
        (r.Prototype = function () {
            this.render = function () {
                return 0 === this.getContainer().getLength() ? (this.hideToggle(), this.hide()) : (this.surface.render(), this.scrollbar.render()), this
            }, this.getContainer = function () {
                return this.docCtrl.container
            }, this.onScroll = function () {
                this.scrollbar.onScroll()
            }, this.hasScrollbar = function () {
                return !0
            }, this.scrollTo = function (t) {
                var e, n, r, o = this.findNodeView(t);
                o ? (n = this.surface.$el.height(), n = (e = this.surface.$el.scrollTop()) + n, (o = c([o], this.surface.$nodes[0])).height, o = (r = o.top) + o.height, e <= r && o <= n || (this.surface.$el.scrollTop(r), this.scrollbar.update())) : console.info("ContainerPanelView.scrollTo(): Unknown resource '%s'", t)
            }, this.findNodeView = function (t) {
                return this.surface.findNodeView(t)
            }, this.addHighlight = function (t, e) {
                a.prototype.addHighlight.call(this, t, e);
                var n = this.getDocument().get(t);
                n && this.scrollbar.addHighlight(t, e + " " + n.type)
            }, this.removeHighlights = function () {
                a.prototype.removeHighlights.call(this), this.scrollbar.removeHighlights(), this.scrollbar.update()
            }, this.update = function () {
                this.scrollbar.update()
            }, this.hide = function () {
                this.hidden || a.prototype.hide.call(this)
            }, this.show = function () {
                this.scrollbar.update(), a.prototype.show.call(this)
            }
        }).prototype = a.prototype, r.prototype = new r.Prototype, e.exports = r.prototype.constructor = r
    }, {
        "../../substance/util/getRelativeBoundingRect": 180,
        "../lens_surface": 136,
        "./panel_view": 149,
        "./surface_scrollbar": 151,
        underscore: 130
    }],
    141: [function (t, e, n) {
        "use strict";

        function r() {
            o.call(this, {
                name: "content",
                type: "document",
                container: "content",
                label: "Contents",
                title: "Contents",
                icon: "fa-align-left"
            })
        }

        var o = t("../container_panel"), i = t("./content_panel_controller");
        (r.Prototype = function () {
            this.createController = function (t) {
                return new i(t, this.config)
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"../container_panel": 138, "./content_panel_controller": 142}],
    142: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.call(this, t, e)
        }

        var o = t("../container_panel_controller"), i = t("./content_panel_view");
        (r.Prototype = function () {
            this.createView = function () {
                var t;
                return this.view || (t = new (t = this.getDocument()).constructor.ViewFactory(t.nodeTypes, this.config), this.view = new i(this, t, this.config)), this.view
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"../container_panel_controller": 139, "./content_panel_view": 143}],
    143: [function (t, e, n) {
        "use strict";

        function r(t, e, n) {
            o.call(this, t, e, n), this.tocView = new i(t, e, c.extend({}, n, {
                type: "resource",
                name: "toc"
            })), this.tocNodeElements = {}, this._onTocItemSelected = c.bind(this.onTocItemSelected, this), this.resources = t.getDocument().addIndex("referenceByTarget", {
                types: ["resource_reference"],
                property: "target"
            }), this.tocView.toc.on("toc-item-selected", this._onTocItemSelected), this.$el.addClass("document")
        }

        var c = t("underscore"), o = t("../container_panel_view"), i = t("./toc_panel_view");
        (r.Prototype = function () {
            this.dispose = function () {
                this.tocView.toc.off("toc-item-selected", this._onTocItemSelected), this.stopListening()
            }, this.getTocView = function () {
                return this.tocView
            }, this.onScroll = function () {
                var t = this.surface.$el.scrollTop();
                this.scrollbar.update(), this.markActiveHeading(t)
            }, this.onTocItemSelected = function (t) {
                t = this.findNodeView(t);
                t && t.scrollIntoView()
            }, this.markActiveHeading = function (t) {
                var e = $(".nodes").height(), n = this.getDocument().getTocNodes(), r = function (t) {
                    return this.tocNodeElements[t] || (this.tocNodeElements[t] = this.findNodeView(t))
                }.bind(this);
                if (0 !== n.length) {
                    r(n[0].id);
                    var o = n[0].id;
                    if (t + this.$el.height() >= e) o = c.last(n).id; else for (var i = n.length - 1; 1 <= i; i--) {
                        var s = n[i], a = r(s.id);
                        if (a) {
                            if ($(a).offset().top - 1 <= 0) {
                                o = a.dataset.id;
                                break
                            }
                        } else console.error("Could not find element for node %s", s.id)
                    }
                    this.tocView.setActiveNode(o)
                }
            }, this.markReferencesTo = function (t) {
                t = this.resources.get(t);
                c.each(t, function (t) {
                    $(this.findNodeView(t.id)).addClass("active")
                }, this)
            }, this.removeHighlights = function () {
                o.prototype.removeHighlights.call(this), this.$el.find(".content-node.active").removeClass("active"), this.$el.find(".annotation.active").removeClass("active")
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r.prototype.constructor = r
    }, {"../container_panel_view": 140, "./toc_panel_view": 145, underscore: 130}],
    144: [function (t, e, n) {
        e.exports = t("./content_panel")
    }, {"./content_panel": 141}],
    145: [function (t, e, n) {
        "use strict";

        function r(t, e, n) {
            i.call(this, t, n), this.toc = new o(t.getDocument(), e)
        }

        var o = t("./toc_view"), i = t("../panel_view");
        (r.Prototype = function () {
            this.render = function () {
                return this.el.appendChild(this.toc.render().el), this
            }, this.setActiveNode = function (t) {
                this.toc.setActiveNode(t)
            }, this.onToggle = function (t) {
                this.trigger("toggle", "toc"), t.preventDefault(), t.stopPropagation()
            }
        }).prototype = i.prototype, r.prototype = new r.Prototype, e.exports = r.prototype.constructor = r
    }, {"../panel_view": 149, "./toc_view": 146}],
    146: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.call(this), this.doc = t, this.viewFactory = e, this.$el.addClass("toc")
        }

        var o = t("../../../substance/application").View,
            i = (t("../../../substance/application").$$, t("../../../substance/data").Graph.Index, t("underscore"));
        (r.Prototype = function () {
            this.render = function () {
                var o = -1, t = this.doc.getTocNodes(), e = document.createElement("div"),
                    n = (e.setAttribute("class", "navigation"), document.createElement("a"));
                return n.setAttribute("href", ""), n.textContent = "Back", e.appendChild(n), t.length < 2 || i.each(t, function (t) {
                    var e, n = this.viewFactory.createView(t), r = t.getLevel();
                    r < 5 && (-1 === r ? r = o + 1 : o = r, n = n.renderTocItem(), e = $(n), n.id = "toc_" + t.id, e.addClass("heading-ref"), e.addClass("level-" + r), e.click(i.bind(this.onClick, this, t.id)), this.el.appendChild(n))
                }, this), this
            }, this.setActiveNode = function (t) {
                this.$(".heading-ref.active").removeClass("active"), this.$("#toc_" + t).addClass("active")
            }, this.onClick = function (t) {
                this.trigger("toc-item-selected", t)
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"../../../substance/application": 160, "../../../substance/data": 166, underscore: 130}],
    147: [function (t, e, n) {
        "use strict";

        function r(t) {
            this.config = t, this.config.label = t.title
        }

        r.Prototype = function () {
            this.createController = function (t) {
                throw new Error("this method is abstract")
            }, this.getName = function () {
                return this.config.name
            }, this.getConfig = function () {
                return this.config
            }
        }, r.prototype = new r.Prototype, e.exports = r.prototype.constructor = r
    }, {}],
    148: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            this.document = t, this.config = e
        }

        var o = t("../../substance/application").Controller;
        t("underscore"), t("../../substance/util");
        (r.Prototype = function () {
            o.prototype;
            this.createView = function () {
                throw new Error("this is an abstract method")
            }, this.getConfig = function () {
                return this.config
            }, this.getName = function () {
                return this.config.name
            }, this.getDocument = function () {
                return this.document
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"../../substance/application": 160, "../../substance/util": 182, underscore: 130}],
    149: [function (t, e, n) {
        function r(t, e) {
            s.call(this), this.controller = t, this.config = e, this.doc = t.getDocument(), this.name = e.name, this.toggleEl = i("a.context-toggle." + this.name, {
                href: "#",
                title: this.config.title,
                html: '<i class="fa ' + this.config.icon + '"></i> ' + this.config.title
            }), this.$toggleEl = $(this.toggleEl), this.$el.addClass("panel").addClass(this.name), "resource" === this.config.type && this.$el.addClass("resource-view"), this._onToggle = o.bind(this.onToggle, this), this._onToggleResource = o.bind(this.onToggleResource, this), this._onToggleResourceReference = o.bind(this.onToggleResourceReference, this), this._onToggleFullscreen = o.bind(this.onToggleFullscreen, this), this.$toggleEl.click(this._onToggle), this.$el.on("click", ".action-toggle-resource", this._onToggleResource), this.$el.on("click", ".toggle-fullscreen", this._onToggleFullscreen), this.$el.on("click", ".annotation.resource-reference", this._onToggleResourceReference), this.highlightedNodes = []
        }

        var o = t("underscore"), t = t("../../substance/application"), i = t.$$, s = t.View;
        (r.Prototype = function () {
            this.dispose = function () {
                this.$toggleEl.off("click", this._onClick), this.$el.off("scroll", this._onScroll), this.$el.off("click", ".a.action-toggle-resource", this._onToggleResource), this.$el.off("click", ".a.toggle-fullscreen", this._onToggleFullscreen), this.$el.off("click", ".annotation.reference", this._onToggleResourceReference), this.stopListening()
            }, this.onToggle = function (t) {
                this.trigger("toggle", this.name), t.preventDefault(), t.stopPropagation()
            }, this.getToggleControl = function () {
                return this.toggleEl
            }, this.hasScrollbar = function () {
                return !1
            }, this.show = function () {
                this.$el.removeClass("hidden"), this.hidden = !1
            }, this.hide = function () {
                this.hidden || (this.$el.addClass("hidden"), this.$toggleEl.removeClass("active"), this.hidden = !0)
            }, this.isHidden = function () {
                return this.hidden
            }, this.activate = function () {
                this.show(), $("#main .article")[0].dataset.context = this.name, this.$toggleEl.addClass("active")
            }, this.addHighlight = function (t, e) {
                var t = this.findNodeView(t);
                t && ((t = $(t)).addClass(e), this.highlightedNodes.push({$el: t, cssClass: e}))
            }, this.removeHighlights = function () {
                for (var t = 0; t < this.highlightedNodes.length; t++) {
                    var e = this.highlightedNodes[t];
                    e.$el.removeClass(e.cssClass)
                }
                this.highlightedNodes = []
            }, this.showToggle = function () {
                this.$toggleEl.removeClass("hidden")
            }, this.hideToggle = function () {
                this.$toggleEl.addClass("hidden")
            }, this.getDocument = function () {
                return this.doc
            }, this.findNodeView = function (t) {
                return this.el.querySelector("*[data-id=" + t + "]")
            }, this.onToggleResource = function (t) {
                t.preventDefault(), t.stopPropagation();
                var t = $(t.currentTarget).parents(".content-node")[0], e = t.dataset.id;
                this.trigger("toggle-resource", this.name, e, t)
            }, this.onToggleResourceReference = function (t) {
                t.preventDefault(), t.stopPropagation();
                var e = t.currentTarget, t = t.currentTarget.dataset.id;
                this.trigger("toggle-resource-reference", this.name, t, e)
            }, this.onToggleFullscreen = function (t) {
                t.preventDefault(), t.stopPropagation();
                var t = $(t.currentTarget).parents(".content-node")[0], e = t.dataset.id;
                this.trigger("toggle-fullscreen", this.name, e, t)
            }
        }).prototype = s.prototype, r.prototype = new r.Prototype, e.exports = r.prototype.constructor = r
    }, {"../../substance/application": 160, underscore: 130}],
    150: [function (t, e, n) {
        function r(t, e) {
            o.call(this, t), this.options = e || {}, void 0 === this.options.header && (this.options.header = !0), void 0 === this.options.zoom && (this.options.zoom = r.enableZoom)
        }

        var o = t("../../article").ViewFactory;
        (r.Prototype = function () {
            this.createView = function (t, e, n) {
                e = e || {};
                n = this.getNodeViewClass(t, n);
                return e.topLevel && n.prototype.isResourceView && this.options.header && (e.header = !0, n.prototype.isZoomable && this.options.zoom && (e.zoom = !0)), new n(t, this, e)
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, r.enableZoom = !1, e.exports = r
    }, {"../../article": 5}],
    151: [function (t, e, n) {
        "use strict";

        function r(t) {
            o.call(this), this.surface = t, this.$nodes = this.surface.$nodes, this.$el.addClass("surface-scrollbar"), this.$el.addClass(t.docCtrl.getContainer().id), this.overlays = [], s.bindAll(this, "mouseDown", "mouseUp", "mouseMove", "updateVisibleArea"), this.$el.mousedown(this.mouseDown), $(window).mousemove(this.mouseMove), $(window).mouseup(this.mouseUp)
        }

        var o = t("../../substance/application").View, i = t("../../substance/application").$$, s = t("underscore");
        (r.Prototype = function () {
            this.render = function () {
                var t = this.$nodes.height(), e = this.surface.$el.height();
                return this.factor = t / e, this.visibleArea = i(".visible-area"), this.scrollTop = this.surface.$el.scrollTop(), this.el.innerHTML = "", this.el.appendChild(this.visibleArea), this.updateVisibleArea(), this
            }, this.updateVisibleArea = function () {
                $(this.visibleArea).css({
                    top: this.scrollTop / this.factor,
                    height: this.surface.$el.height() / this.factor
                })
            }, this.addOverlay = function (t) {
                var e = $("<div>").addClass("node overlay");
                return this.overlays.push({el: t, $overlay: e}), this.$el.append(e), e
            }, this.updateOverlay = function (t, e) {
                var t = $(t), n = t.outerHeight(!0) / this.factor, t = (t.offset().top - this.surfaceTop) / this.factor;
                n < r.OverlayMinHeight && (t -= .5 * (n = r.OverlayMinHeight)), e.css({height: n, top: t})
            }, this.addHighlight = function (t, e) {
                var n, t = this.surface.findNodeView(t);
                if (t) return n = this.addOverlay(t), this.updateOverlay(t, n), n.addClass(e), n[0]
            }, this.addHighlights = function (t, e) {
                for (var n = [], r = 0; r < t.length; r++) {
                    var o = this.addHighlight(t[r], e);
                    n.push(o)
                }
                return this.update(), n
            }, this.removeHighlights = function () {
                for (var t = 0; t < this.overlays.length; t++) this.overlays[t].$overlay.remove()
            }, this.update = function () {
                var t = this.$nodes.height(), e = this.surface.$el.height();
                e < t ? $(this.el).removeClass("hidden") : $(this.el).addClass("hidden"), this.factor = t / e, this.surfaceTop = this.$nodes.offset().top, this.scrollTop = this.surface.$el.scrollTop(), this.updateVisibleArea();
                for (var n = 0; n < this.overlays.length; n++) {
                    var r = this.overlays[n];
                    this.updateOverlay(r.el, r.$overlay)
                }
            }, this.mouseDown = function (t) {
                this._mouseDown = !0;
                var e = t.pageY;
                return t.target !== this.visibleArea ? (this.offset = $(this.visibleArea).height() / 2, this.mouseMove(t)) : this.offset = e - $(this.visibleArea).position().top, !1
            }, this.mouseUp = function () {
                this._mouseDown = !1
            }, this.mouseMove = function (t) {
                this._mouseDown && (t = (t.pageY - this.offset) * this.factor, this.scrollTop = this.surface.$el.scrollTop(t), this.updateVisibleArea())
            }, this.onScroll = function () {
                this.surface && (this.scrollTop = this.surface.$el.scrollTop(), this.updateVisibleArea())
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, r.OverlayMinHeight = 5, e.exports = r
    }, {"../../substance/application": 160, underscore: 130}],
    152: [function (t, e, n) {
        "use strict";

        function r(e, t, n) {
            this.__document = e, this.options = n || {}, this.panels = n.panels, this.contentPanel = new a(e), this.panelCtrls = {}, this.panelCtrls.content = this.contentPanel.createController(e), o.each(this.panels, function (t) {
                this.panelCtrls[t.getName()] = t.createController(e)
            }, this), this.workflows = n.workflows || [], this.state = t, this.currentPanel = "toc"
        }

        var o = t("underscore"), i = t("../substance/application").Controller, s = t("./reader_view"),
            a = t("./panels/content");
        (r.Prototype = function () {
            this.createView = function () {
                return this.view || (this.view = new s(this)), this.view
            }, this.switchPanel = function (t) {
                this.currentPanel = t, this.modifyState({panel: t, focussedNode: null, fullscreen: !1})
            }, this.getDocument = function () {
                return this.__document
            }
        }).prototype = i.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"../substance/application": 160, "./panels/content": 144, "./reader_view": 153, underscore: 130}],
    153: [function (t, e, n) {
        "use strict";

        function r(r) {
            o.call(this), this.readerCtrl = r, this.doc = this.readerCtrl.getDocument(), this.$el.addClass("article"), this.$el.addClass(this.doc.schema.id), this.bodyScroll = {}, this.contentView = r.panelCtrls.content.createView(), this.tocView = this.contentView.getTocView(), this.panelViews = {}, this.panelForRef = {}, c.each(r.panels, function (t) {
                var e = t.getName(), n = r.panelCtrls[e];
                this.panelViews[e] = n.createView(), c.each(t.config.references, function (t) {
                    this.panelForRef[t] = e
                }, this)
            }, this), this.panelViews.toc = this.tocView, this.resources = new i(this.readerCtrl.getDocument(), {
                types: ["resource_reference"],
                property: "target"
            }), this.lastWorkflow = null, this.lastPanel = "toc", this._onTogglePanel = c.bind(this.switchPanel, this), this.listenTo(this.readerCtrl, "state-changed", this.updateState), this.listenTo(this.tocView, "toggle", this._onTogglePanel), c.each(this.panelViews, function (t) {
                this.listenTo(t, "toggle", this._onTogglePanel), this.listenTo(t, "toggle-resource", this.onToggleResource), this.listenTo(t, "toggle-resource-reference", this.onToggleResourceReference), this.listenTo(t, "toggle-fullscreen", this.onToggleFullscreen)
            }, this), this.listenTo(this.contentView, "toggle", this._onTogglePanel), this.listenTo(this.contentView, "toggle-resource", this.onToggleResource), this.listenTo(this.contentView, "toggle-resource-reference", this.onToggleResourceReference), this.listenTo(this.contentView, "toggle-fullscreen", this.onToggleFullscreen), c.each(this.readerCtrl.workflows, function (t) {
                t.attach(this.readerCtrl, this)
            }, this), $(window).resize(c.debounce(c.bind(function () {
                this.contentView.scrollbar.update();
                var t = this.panelViews[this.readerCtrl.state.panel];
                t && t.hasScrollbar() && t.scrollbar.update()
            }, this), 1))
        }

        var c = t("underscore"), o = t("../substance/application").View, i = t("../substance/data").Graph.Index,
            a = t("../substance/application").$$;
        (r.Prototype = function () {
            this.render = function () {
                var t = document.createDocumentFragment(),
                    e = (t.appendChild(this.contentView.render().el), a(".scrollbar-cover")),
                    n = parseInt($(".panel.content.document").width(), 10),
                    r = parseInt($(".surface.resource-view.content").width(), 10),
                    o = parseInt($(".scrollbar-cover").width(), 10);
                parseInt(10 * (n + r + o) / 100, 10), $(".scrollbar-cover").offset(), $(".surface.resource-view.content");
                this.contentView.el.appendChild(e);
                var i = a(".context-toggles"),
                    s = (i.appendChild(this.tocView.getToggleControl()), this.tocView.on("toggle", this._onClickPanel), c.each(this.readerCtrl.panels, function (t) {
                        var t = this.panelViews[t.getName()], e = t.getToggleControl();
                        i.appendChild(e), t.on("toggle", this._onClickPanel)
                    }, this), a(".resources")),
                    n = (s.appendChild(this.tocView.render().el), c.each(this.readerCtrl.panels, function (t) {
                        t = this.panelViews[t.getName()];
                        s.appendChild(t.render().el)
                    }, this), a(".menu-bar"));
                return n.appendChild(i), s.appendChild(n), t.appendChild(s), this.el.appendChild(t), c.delay(c.bind(function () {
                    this.updateState();
                    var t = this;
                    window.MathJax && (window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub]), window.MathJax.Hub.Queue(function () {
                        t.updateState()
                    }))
                }, this), 1), this
            }, this.dispose = function () {
                c.each(this.workflows, function (t) {
                    t.detach()
                }), this.contentView.dispose(), c.each(this.panelViews, function (t) {
                    t.off("toggle", this._onClickPanel), t.dispose()
                }, this), this.resources.dispose(), this.stopListening()
            }, this.getState = function () {
                return this.readerCtrl.state
            }, this.switchPanel = function (t) {
                this.readerCtrl.switchPanel(t), this.lastPanel = t
            }, this.updateState = function () {
                var t, e, n = this, r = this.readerCtrl.state,
                    o = {focussedNode: r.focussedNode ? this.doc.get(r.focussedNode) : null},
                    i = "content" === r.panel ? this.contentView : this.panelViews[r.panel];
                if (c.each(this.panelViews, function (t) {
                    t.isHidden() || t.hide()
                }), this.contentView.removeHighlights(), c.each(this.panelViews, function (t) {
                    t.removeHighlights()
                }), r.focussedNode && (e = ["focussed", "highlighted"], r.fullscreen && e.push("fullscreen"), this.contentView.addHighlight(r.focussedNode, e.concat("main-occurrence").join(" ")), i.addHighlight(r.focussedNode, e.join(" ")), i.scrollTo(r.focussedNode)), !(t = this.lastWorkflow ? this.lastWorkflow.handleStateUpdate(r, o) : t)) for (var s = 0; s < this.readerCtrl.workflows.length; s++) {
                    var a = this.readerCtrl.workflows[s];
                    if (a !== this.lastWorkflow && a.handlesStateUpdate && (t = a.handleStateUpdate(r, o))) {
                        this.lastWorkflow = a;
                        break
                    }
                }
                t || ("content" !== r.panel ? (e = this.panelViews[r.panel], this.showPanel(r.panel), r.focussedNode && (i = this.resources.get(r.focussedNode), c.each(i, function (t) {
                    this.contentView.addHighlight(t.id, "highlighted "), this.contentView.scrollTo(t.target)
                }, this), e.hasScrollbar() && e.scrollTo(r.focussedNode))) : this.showPanel("toc")), n.updateScrollbars(), c.delay(function () {
                    n.updateScrollbars()
                }, 2e3)
            }, this.updateScrollbars = function () {
                this.readerCtrl.state;
                this.contentView.scrollbar.update(), c.each(this.panelViews, function (t) {
                    t.hasScrollbar() && t.scrollbar.update()
                })
            }, this.showPanel = function (t) {
                this.panelViews[t] ? (this.panelViews[t].activate(), this.el.dataset.context = t) : "content" === t && (this.panelViews.toc.activate(), this.el.dataset.context = t)
            }, this.getPanelView = function (t) {
                return this.panelViews[t]
            }, this.onToggleResource = function (t, e, n) {
                n.classList.contains("highlighted") ? this.readerCtrl.modifyState({
                    panel: t,
                    focussedNode: null,
                    fullscreen: !1
                }) : this.readerCtrl.modifyState({panel: t, focussedNode: e})
            }, this.onToggleResourceReference = function (t, e, n) {
                n.classList.contains("highlighted") || this.readerCtrl.modifyState({
                    panel: "content",
                    focussedNode: e,
                    fullscreen: !1
                })
            }, this.onToggleFullscreen = function (t, e) {
                var n = !this.readerCtrl.state.fullscreen;
                this.readerCtrl.modifyState({panel: t, focussedNode: e, fullscreen: n})
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r.prototype.constructor = r
    }, {"../substance/application": 160, "../substance/data": 166, underscore: 130}],
    154: [function (t, e, n) {
        "use strict";

        function r() {
            i.apply(this, arguments), this._followCrossReference = o.bind(this.followCrossReference, this)
        }

        var o = t("underscore"), i = t("./workflow");
        (r.Prototype = function () {
            this.registerHandlers = function () {
                this.readerView.$el.on("click", ".annotation.cross_reference", this._followCrossReference)
            }, this.unRegisterHandlers = function () {
                this.readerView.$el.off("click", ".annotation.cross_reference", this._followCrossReference)
            }, this.followCrossReference = function (t) {
                t.preventDefault(), t.stopPropagation();
                var e, t = t.currentTarget.dataset.id, t = this.readerCtrl.getDocument().get(t);
                void 0 !== t && (void 0 !== t.target && (e = t.target, this.readerView.contentView.scrollTo(e)), void 0 === e && void 0 !== t.properties && (e = t.properties.id, this.readerView.contentView.scrollTo(e)))
            }
        }).prototype = i.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"./workflow": 157, underscore: 130}],
    155: [function (t, n, r) {
        "use strict";

        function o() {
            s.apply(this, arguments), this._gotoTop = i.bind(this.gotoTop, this)
        }

        var i = t("underscore"), s = t("./workflow");
        (o.Prototype = function () {
            this.registerHandlers = function () {
                this.readerView.$el.on("click", ".document .content-node.heading .top", this._gotoTop)
            }, this.unRegisterHandlers = function () {
                this.readerView.$el.off("click", ".document .content-node.heading .top", this._gotoTop)
            }, this.gotoTop = function () {
                e.preventDefault(), e.stopPropagation(), this.readerCtrl.contentView.jumpToNode("cover")
            }
        }).prototype = s.prototype, o.prototype = new o.Prototype, n.exports = o
    }, {"./workflow": 157, underscore: 130}],
    156: [function (t, e, n) {
        "use strict";

        function r() {
            o.apply(this, arguments)
        }

        var i = t("underscore"), o = t("./workflow");
        (r.Prototype = function () {
            this.registerHandlers = function () {
            }, this.unRegisterHandlers = function () {
            }, this.handlesStateUpdate = !0, this.handleStateUpdate = function (t, e) {
                var n, r, o;
                return !(!e.focussedNode || !this.readerView.panelForRef[e.focussedNode.type]) && (e = e.focussedNode, o = this.readerView.panelForRef[e.type], o = this.readerView.panelViews[o], n = this.readerView.contentView, r = e.target, o.activate(), o.addHighlight(r, ["highlighted"].join(" ")), o.scrollTo(r), delete (o = this.readerView.resources.get(r))[e.id], i.each(o, function (t) {
                    n.addHighlight(t.id, "highlighted")
                }, this), !0)
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"./workflow": 157, underscore: 130}],
    157: [function (t, e, n) {
        "use strict";

        function r() {
            this.readerController = null, this.readerView = null
        }

        r.Prototype = function () {
            this.attach = function (t, e) {
                this.readerCtrl = t, this.readerView = e, this.registerHandlers()
            }, this.detach = function () {
                this.unRegisterHandlers(), this.readerView = null, this.readerController = null
            }, this.registerHandlers = function () {
                throw new Error("This method is abstract")
            }, this.unRegisterHandlers = function () {
                throw new Error("This method is abstract")
            }, this.handlesStateUpdate = !1, this.handleStateUpdate = function (t, e) {
                throw new Error("This method is abstract")
            }
        }, r.prototype = new r.Prototype, e.exports = r
    }, {}],
    158: [function (t, e, n) {
        "use strict";

        function r(t) {
            o.call(this), this.config = t
        }

        var o = t("./view"), i = t("./router"), s = (t("../../substance/util"), t("underscore"));
        (r.Prototype = function () {
            this.initRouter = function () {
                this.router = new i, s.each(this.config.routes, function (t) {
                    this.router.route(t.route, t.name, s.bind(this.controller[t.command], this.controller))
                }, this), i.history.start()
            }, this.start = function () {
                this.$el = $("body"), this.el = this.$el[0], this.render(), this.initRouter()
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"../../substance/util": 182, "./router": 162, "./view": 163, underscore: 130}],
    159: [function (t, e, n) {
        "use strict";

        function r(t) {
            this.state = {}, this.context = null
        }

        var o = t("../../substance/util"), i = t("underscore");
        (r.Prototype = function () {
            this.updateState = function (t, e) {
                console.error("updateState is deprecated, use modifyState. State is now a rich object where context replaces the old state variable");
                var n = this.context;
                this.context = t, this.state = e, this.trigger("state-changed", this.context, n, e)
            }, this.modifyState = function (t) {
                var e = this.state.context;
                i.extend(this.state, t), t.context && t.context !== e && this.trigger("context-changed", t.context), this.trigger("state-changed", this.state.context)
            }
        }).prototype = o.Events, r.prototype = new r.Prototype, e.exports = r
    }, {"../../substance/util": 182, underscore: 130}],
    160: [function (t, e, n) {
        "use strict";
        var r = t("./application");
        r.View = t("./view"), r.Router = t("./router"), r.Controller = t("./controller"), r.ElementRenderer = t("./renderers/element_renderer"), r.$$ = r.ElementRenderer.$$, e.exports = r
    }, {
        "./application": 158,
        "./controller": 159,
        "./renderers/element_renderer": 161,
        "./router": 162,
        "./view": 163
    }],
    161: [function (t, e, n) {
        "use strict";

        function r(t) {
            return this.attributes = t, this.tagName = t.tag, this.children = t.children || [], this.text = t.text || "", this.html = t.html, delete t.children, delete t.text, delete t.html, delete t.tag, this.render()
        }

        var t = t("../../../substance/util"), o = t.RegExp;
        r.Prototype = function () {
            this.render = function () {
                var t, e = document.createElement(this.tagName);
                for (t in this.html ? e.innerHTML = this.html : e.textContent = this.text, this.attributes) {
                    var n = this.attributes[t];
                    e.setAttribute(t, n)
                }
                for (var r = 0; r < this.children.length; r++) {
                    var o = this.children[r];
                    e.appendChild(o)
                }
                return this.el = e
            }
        };
        r.$$ = function (t, e) {
            var e = e || {}, n = /^([a-zA-Z0-9]*)/.exec(t),
                n = (e.tag = n && n[1] ? n[1] : "div", /#([a-zA-Z0-9_]*)/.exec(t)),
                n = (n && n[1] && (e.id = n[1]), new o(/\.([a-zA-Z0-9_-]*)/g));
            return e.class || (e.class = n.match(t).map(function (t) {
                return t.match[1]
            }).join(" ")), new r(e)
        }, r.Prototype.prototype = t.Events, r.prototype = new r.Prototype, e.exports = r
    }, {"../../../substance/util": 182}],
    162: [function (t, e, n) {
        "use strict";

        function i(t) {
            (t = t || {}).routes && (this.routes = t.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
        }

        var r = t("../../substance/util"), s = t("underscore"), o = /\((.*?)\)/g, a = /(\(\?)?:\w+/g, c = /\*\w+/g,
            u = /[\-{}\[\]+?.,\\\^$|#\s]/g, l = (s.extend(i.prototype, r.Events, {
                initialize: function () {
                }, route: function (e, n, r) {
                    s.isRegExp(e) || (e = this._routeToRegExp(e)), s.isFunction(n) && (r = n, n = ""), r = r || this[n];
                    var o = this;
                    return i.history.route(e, function (t) {
                        t = o._extractParameters(e, t);
                        r && r.apply(o, t), o.trigger.apply(o, ["route:" + n].concat(t)), o.trigger("route", n, t), i.history.trigger("route", o, n, t)
                    }), this
                }, navigate: function (t, e) {
                    return i.history.navigate(t, e), this
                }, _bindRoutes: function () {
                    if (this.routes) {
                        this.routes = s.result(this, "routes");
                        for (var t, e = s.keys(this.routes); null != (t = e.pop());) this.route(t, this.routes[t])
                    }
                }, _routeToRegExp: function (t) {
                    return t = t.replace(u, "\\$&").replace(o, "(?:$1)?").replace(a, function (t, e) {
                        return e ? t : "([^/]+)"
                    }).replace(c, "(.*?)"), new RegExp("^" + t + "$")
                }, _extractParameters: function (t, e) {
                    t = t.exec(e).slice(1);
                    return s.map(t, function (t) {
                        return t ? decodeURIComponent(t) : null
                    })
                }
            }), i.History = function () {
                this.handlers = [], s.bindAll(this, "checkUrl"), "undefined" != typeof window && (this.location = window.location, this.history = window.history)
            }), p = /^[#\/]|\s+$/g, h = /^\/+|\/+$/g, d = /msie [\w.]+/, f = /\/$/;
        l.started = !1, s.extend(l.prototype, r.Events, {
            interval: 50, getHash: function (t) {
                t = (t || this).location.href.match(/#(.*)$/);
                return t ? t[1] : ""
            }, getFragment: function (t, e) {
                return null == t && (this._hasPushState || !this._wantsHashChange || e ? (t = this.location.pathname, e = this.root.replace(f, ""), t.indexOf(e) || (t = t.substr(e.length))) : t = this.getHash()), t.replace(p, "")
            }, start: function (t) {
                if (l.started) throw new Error("Router.history has already been started");
                l.started = !0, this.options = s.extend({}, {root: "/"}, this.options, t), this.root = this.options.root, this._wantsHashChange = !1 !== this.options.hashChange, this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && this.history && this.history.pushState);
                var t = this.getFragment(), e = document.documentMode,
                    e = d.exec(navigator.userAgent.toLowerCase()) && (!e || e <= 7),
                    e = (this.root = ("/" + this.root + "/").replace(h, "/"), e && this._wantsHashChange && (this.iframe = $('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(t)), this._hasPushState ? $(window).on("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !e ? $(window).on("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = t, this.location),
                    t = e.pathname.replace(/[^\/]$/, "$&/") === this.root;
                return this._wantsHashChange && this._wantsPushState && !this._hasPushState && !t ? (this.fragment = this.getFragment(null, !0), this.location.replace(this.root + this.location.search + "#" + this.fragment), !0) : (this._wantsPushState && this._hasPushState && t && e.hash && (this.fragment = this.getHash().replace(p, ""), this.history.replaceState({}, document.title, this.root + this.fragment + e.search)), this.options.silent ? void 0 : this.loadUrl())
            }, stop: function () {
                $(window).off("popstate", this.checkUrl).off("hashchange", this.checkUrl), clearInterval(this._checkUrlInterval), l.started = !1
            }, route: function (t, e) {
                this.handlers.unshift({route: t, callback: e})
            }, checkUrl: function (t) {
                var e = this.getFragment();
                if ((e = e === this.fragment && this.iframe ? this.getFragment(this.getHash(this.iframe)) : e) === this.fragment) return !1;
                this.iframe && this.navigate(e), this.loadUrl() || this.loadUrl(this.getHash())
            }, loadUrl: function (t) {
                var e = this.fragment = this.getFragment(t);
                return s.any(this.handlers, function (t) {
                    if (t.route.test(e)) return t.callback(e), !0
                })
            }, navigate: function (t, e) {
                if (!l.started) return !1;
                if (e && !0 !== e || (e = {trigger: e}), t = this.getFragment(t || ""), this.fragment !== t) {
                    this.fragment = t;
                    var n = this.root + t;
                    if (this._hasPushState) this.history[e.replace ? "replaceState" : "pushState"]({}, document.title, n); else {
                        if (!this._wantsHashChange) return this.location.assign(n);
                        this._updateHash(this.location, t, e.replace), this.iframe && t !== this.getFragment(this.getHash(this.iframe)) && (e.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, t, e.replace))
                    }
                    e.trigger && this.loadUrl(t)
                }
            }, _updateHash: function (t, e, n) {
                n ? (n = t.href.replace(/(javascript:|#).*$/, ""), t.replace(n + "#" + e)) : t.hash = "#" + e
            }
        }), i.history = new l, e.exports = i
    }, {"../../substance/util": 182, underscore: 130}],
    163: [function (t, e, n) {
        "use strict";

        function r(t) {
            this.el = (t = t || {}).el || window.document.createElement(t.elementType || "div"), this.$el = $(this.el), this.dispatchDOMEvents()
        }

        t = t("../../substance/util");
        (r.Prototype = function () {
            this.$ = function (t) {
                return this.$el.find(t)
            }, this.render = function () {
                return this
            }, this.dispatchDOMEvents = function () {
                var r = this;
                this.$el.delegate("[sbs-click]", "click", function (t) {
                    console.error("FIXME: sbs-click is deprecated. Use jquery handlers with selectors instead.");
                    var e = function (t) {
                        var e = /(\w+)\((.*)\)/.exec(t);
                        if (e) return {method: e[1], args: e[2].split(",")};
                        throw new Error("Invalid click handler '" + t + "'")
                    }($(t.currentTarget).attr("sbs-click")), n = r[e.method];
                    if (n) return t.stopPropagation(), t.preventDefault(), n.apply(r, e.args), !1
                })
            }
        }).prototype = t.Events, r.prototype = new r.Prototype, e.exports = r
    }, {"../../substance/util": 182}],
    164: [function (t, e, n) {
        "use strict";

        function o(t) {
            return i.isArray(t) && (t = t[0]), 0 <= h.indexOf(t)
        }

        function r(t, e) {
            if (e = e || {}, this.schema = new c(t), this.schema.id && e.seed && e.seed.schema && !i.isEqual(e.seed.schema, [this.schema.id, this.schema.version])) throw new p(["Graph does not conform to schema. Expected: ", this.schema.id + "@" + this.schema.version, " Actual: ", e.seed.schema[0] + "@" + e.seed.schema[1]].join(""));
            this.nodes = {}, this.indexes = {}, this.__seed__ = e.seed, this.init()
        }

        var i = t("underscore"), s = t("../../substance/util"), a = s.errors, c = t("./schema"), u = t("./property"),
            l = t("./graph_index"), p = a.define("GraphError"),
            h = ["object", "array", "string", "number", "boolean", "date"];
        r.Prototype = function () {
            i.extend(this, s.Events), this.create = function (t) {
                this.nodes[t.id] = t, this._updateIndexes({type: "create", path: [t.id], val: t})
            }, this.delete = function (t) {
                var e = this.nodes[t];
                delete this.nodes[t], this._updateIndexes({type: "delete", path: [t], val: e})
            }, this.set = function (t, e) {
                var n = this.resolve(t);
                if (!n) throw new p("Could not resolve property with path " + JSON.stringify(t));
                var r = n.get();
                n.set(e), this._updateIndexes({type: "set", path: t, val: e, original: r})
            }, this.get = function (t) {
                if (i.isArray(t) || i.isString(t)) return 1 < arguments.length && (t = i.toArray(arguments)), i.isString(t) ? this.nodes[t] : this.resolve(t).get();
                throw new p("Invalid argument path. Must be String or Array")
            }, this.query = function (t) {
                var t = this.resolve(t), e = t.type, n = t.baseType, t = t.get();
                return "array" === n ? this._queryArray.call(this, t, e) : o(n) ? t : this.get(t)
            }, this.toJSON = function () {
                return {id: this.id, schema: [this.schema.id, this.schema.version], nodes: s.deepclone(this.nodes)}
            }, this.contains = function (t) {
                return !!this.nodes[t]
            }, this.resolve = function (t) {
                return new u(this, t)
            }, this.reset = function () {
                this.init(), this.trigger("graph:reset")
            }, this.init = function () {
                this.__is_initializing__ = !0, this.__seed__ ? this.nodes = s.clone(this.__seed__.nodes) : this.nodes = {}, i.each(this.indexes, function (t) {
                    t.reset()
                }), delete this.__is_initializing__
            }, this.addIndex = function (t, e) {
                if (this.indexes[t]) throw new p("Index with name " + t + "already exists.");
                e = new l(this, e);
                return this.indexes[t] = e
            }, this.removeIndex = function (t) {
                delete this.indexes[t]
            }, this._updateIndexes = function (e) {
                i.each(this.indexes, function (t) {
                    e ? t.onGraphChange(e) : t.rebuild()
                }, this)
            }, this._queryArray = function (t, e) {
                if (!i.isArray(e)) throw new p("Illegal argument: array types must be specified as ['array'(, 'array')*, <type>]");
                var n, r;
                if ("array" === e[1]) for (n = [], r = 0; r < t.length; r++) n.push(this._queryArray(t[r], e.slice(1))); else if (o(e[1])) n = t; else for (n = [], r = 0; r < t.length; r++) n.push(this.get(t[r]));
                return n
            }
        }, r.DEFAULT_MODE = r.STRICT_INDEXING = 2, r.prototype = new r.Prototype, r.Schema = c, r.Property = u, r.Index = l, e.exports = r
    }, {"../../substance/util": 182, "./graph_index": 165, "./property": 167, "./schema": 168, underscore: 130}],
    165: [function (t, e, n) {
        function i(t, e) {
            e = e || {}, this.graph = t, this.nodes = {}, this.scopes = {}, e.filter ? this.filter = e.filter : e.types && (this.filter = i.typeFilter(t.schema, e.types)), e.property && (this.property = e.property), this.createIndex()
        }

        var s = t("underscore"), t = t("../../substance/util");
        i.Prototype = function () {
            function o(t) {
                var e = this;
                if (null !== t) for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    e.scopes[r] = e.scopes[r] || {nodes: {}, scopes: {}}, e = e.scopes[r]
                }
                return e
            }

            function n(t) {
                return this.property ? (t = t[this.property] || null, t = s.isString(t) ? [t] : t) : null
            }

            function r(t) {
                var n = s.extend({}, t.nodes);
                return s.each(t.scopes, function (t, e) {
                    "nodes" !== e && s.extend(n, r(t))
                }), n
            }

            this.onGraphChange = function (t) {
                this.applyOp(t)
            }, this._add = function (t) {
                var e;
                this.filter && !this.filter(t) || (e = n.call(this, t), o.call(this, e).nodes[t.id] = t.id)
            }, this._remove = function (t) {
                var e;
                this.filter && !this.filter(t) || (e = n.call(this, t), delete o.call(this, e).nodes[t.id])
            }, this._update = function (t, e, n, r) {
                this.property !== e || this.filter && !this.filter(t) || (s.isString(e = r) && (e = [e]), delete (r = o.call(this, e)).nodes[t.id], e = n, r.nodes[t.id] = t.id)
            }, this.applyOp = function (t) {
                var e, n, r;
                "create" === t.type ? this._add(t.val) : "delete" === t.type ? this._remove(t.val) : void 0 !== (n = (e = this.graph.resolve(this, t.path)).get()) && ("set" === t.type ? r = t.original : console.error("Operational updates are not supported in this implementation"), this._update(e.node, e.key, n, r))
            }, this.createIndex = function () {
                this.reset();
                var t = this.graph.nodes;
                s.each(t, function (t) {
                    var e;
                    this.filter && !this.filter(t) || (e = n.call(this, t), o.call(this, e).nodes[t.id] = t.id)
                }, this)
            }, this.get = function (t) {
                0 === arguments.length ? t = null : s.isString(t) && (t = [t]);
                var e = o.call(this, t), e = r(e), n = new i.Result;
                return s.each(e, function (t) {
                    n[t] = this.graph.get(t)
                }, this), n
            }, this.reset = function () {
                this.nodes = {}, this.scopes = {}
            }, this.dispose = function () {
                this.stopListening()
            }, this.rebuild = function () {
                this.reset(), this.createIndex()
            }
        }, i.prototype = s.extend(new i.Prototype, t.Events.Listener), i.typeFilter = function (r, o) {
            return function (t) {
                for (var e = r.typeChain(t.type), n = 0; n < o.length; n++) if (0 <= e.indexOf(o[n])) return !0;
                return !1
            }
        }, (i.Result = function () {
        }).prototype.asList = function () {
            var t, e = [];
            for (t in this) e.push(this[t])
        }, i.Result.prototype.getLength = function () {
            return Object.keys(this).length
        }, e.exports = i
    }, {"../../substance/util": 182, underscore: 130}],
    166: [function (t, e, n) {
        "use strict";
        var r = {VERSION: "0.8.0"};
        r.Graph = t("./graph"), e.exports = r
    }, {"./graph": 164}],
    167: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            if (!e) throw new Error("Illegal argument: path is null/undefined.");
            this.graph = t, this.schema = t.schema, o.extend(this, this.resolve(e))
        }

        var o = t("underscore");
        r.Prototype = function () {
            this.resolve = function (t) {
                for (var e = this.graph, n = e, r = "graph", o = 0; o < t.length; o++) if ("graph" === r || void 0 !== this.schema.types[r]) {
                    if (void 0 === (n = this.graph.get(t[o]))) return;
                    e = n, r = this.schema.properties(n.type), a = e, i = void 0
                } else {
                    if (void 0 === n) return;
                    var i = t[o], s = t[o], r = r[s], a = n[i];
                    o < t.length - 1 && (n = n[s])
                }
                return {node: e, parent: n, type: r, key: i, value: a}
            }, this.get = function () {
                return void 0 !== this.key ? this.parent[this.key] : this.node
            }, this.set = function (t) {
                if (void 0 === this.key) throw new Error("'set' is only supported for node properties.");
                this.parent[this.key] = this.schema.parseValue(this.baseType, t)
            }
        }, r.prototype = new r.Prototype, Object.defineProperties(r.prototype, {
            baseType: {
                get: function () {
                    return o.isArray(this.type) ? this.type[0] : this.type
                }
            }, path: {
                get: function () {
                    return [this.node.id, this.key]
                }
            }
        }), e.exports = r
    }, {underscore: 130}],
    168: [function (t, e, n) {
        "use strict";

        function r(t) {
            o.extend(this, t)
        }

        var o = t("underscore"), i = t("../../substance/util");
        r.Prototype = function () {
            this.defaultValue = function (t) {
                return "object" === t ? {} : "array" === t ? [] : "string" === t ? "" : "number" === t ? 0 : "boolean" !== t && ("date" === t ? new Date : null)
            }, this.parseValue = function (t, e) {
                if (null === e) return e;
                if (o.isString(e)) {
                    if ("object" === t) return JSON.parse(e);
                    if ("array" === t) return JSON.parse(e);
                    if ("string" === t) return e;
                    if ("number" === t) return parseInt(e, 10);
                    if ("boolean" !== t) return "date" === t ? new Date(e) : e;
                    if ("true" === e) return !0;
                    if ("false" === e) return !1;
                    throw new Error("Can not parse boolean value from: " + e)
                }
                if ("array" === t) {
                    if (!o.isArray(e)) throw new Error("Illegal value type: expected array.");
                    e = i.deepclone(e)
                } else if ("string" === t) {
                    if (!o.isString(e)) throw new Error("Illegal value type: expected string.")
                } else if ("object" === t) {
                    if (!o.isObject(e)) throw new Error("Illegal value type: expected object.");
                    e = i.deepclone(e)
                } else if ("number" === t) {
                    if (!o.isNumber(e)) throw new Error("Illegal value type: expected number.")
                } else if ("boolean" === t) {
                    if (!o.isBoolean(e)) throw new Error("Illegal value type: expected boolean.")
                } else {
                    if ("date" !== t) throw new Error("Unsupported value type: " + t);
                    e = new Date(e)
                }
                return e
            }, this.type = function (t) {
                return this.types[t]
            }, this.typeChain = function (t) {
                var e = this.types[t];
                if (!e) throw new Error("Type " + t + " not found in schema");
                e = e.parent ? this.typeChain(e.parent) : [];
                return e.push(t), e
            }, this.isInstanceOf = function (t, e) {
                t = this.typeChain(t);
                return !!(t && 0 <= t.indexOf(e))
            }, this.baseType = function (t) {
                return this.typeChain(t)[0]
            }, this.properties = function (t) {
                var e = (t = o.isObject(t) ? t : this.type(t)).parent ? this.properties(t.parent) : {};
                return o.extend(e, t.properties), e
            }, this.propertyType = function (t, e) {
                var n = this.properties(t)[e];
                if (n) return o.isArray(n) ? n : [n];
                throw new Error("Property not found for" + t + "." + e)
            }, this.propertyBaseType = function (t, e) {
                return this.propertyType(t, e)[0]
            }
        }, r.prototype = new r.Prototype, e.exports = r
    }, {"../../substance/util": 182, underscore: 130}],
    169: [function (t, e, n) {
        function r(t, e) {
            o.call(this, t, e)
        }

        var o = t("./node");
        r.type = {id: "composite", parent: "content", properties: {}}, r.description = {
            name: "Composite",
            remarks: ["A file reference to an external resource."],
            properties: {}
        }, r.example = {no_example: "yet"}, (r.Prototype = function () {
            this.getLength = function () {
                throw new Error("Composite.getLength() is abstract.")
            }, this.getNodes = function () {
                return this.getChildrenIds()
            }, this.getChildrenIds = function () {
                throw new Error("Composite.getChildrenIds() is abstract.")
            }, this.isMutable = function () {
                return !1
            }, this.insertOperation = function () {
                return null
            }, this.deleteOperation = function () {
                return null
            }, this.insertChild = function () {
                throw new Error("This composite is immutable.")
            }, this.deleteChild = function () {
                throw new Error("This composite is immutable.")
            }, this.getChangePosition = function (t) {
                return 0
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {"./node": 174}],
    170: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            this.document = t, this.view = e, this.treeView = [], this.listView = [], this.__parents = {}, this.__composites = {}, this.rebuild()
        }

        var o = t("underscore"), i = t("../../substance/util"), a = t("./composite");
        r.Prototype = function () {
            this.rebuild = function () {
                this.treeView.splice(0, this.treeView.length), this.listView.splice(0, this.listView.length), this.treeView = o.clone(this.view.nodes);
                for (var t = 0; t < this.view.length; t++) this.treeView.push(this.view[t]);
                this.__parents = {}, this.__composites = {}, function (t, e) {
                    var n, r, o = [];
                    for (s = this.treeView.length - 1; 0 <= s; s--) o.unshift({id: this.treeView[s], parent: null});
                    for (; 0 < o.length;) {
                        if (n = o.shift(), (r = this.document.get(n.id)) instanceof a) for (var i = r.getNodes(), s = i.length - 1; 0 <= s; s--) o.unshift({
                            id: i[s],
                            parent: r.id
                        });
                        t.call(e, r, n.parent)
                    }
                }.call(this, function (t, e) {
                    if (t instanceof a) this.__parents[t.id] = e, this.__composites[e] = e; else {
                        if (this.listView.push(t.id), this.__parents[t.id]) throw new Error("Nodes must be unique in one view.");
                        this.__parents[t.id] = e, this.__composites[e] = e
                    }
                }, this)
            }, this.getTopLevelNodes = function () {
                return o.map(this.treeView, function (t) {
                    return this.document.get(t)
                }, this)
            }, this.getNodes = function (t) {
                var e = this.listView;
                if (t) return o.clone(e);
                for (var n = [], r = 0; r < e.length; r++) n.push(this.document.get(e[r]));
                return n
            }, this.getPosition = function (t) {
                return this.listView.indexOf(t)
            }, this.getNodeFromPosition = function (t) {
                t = this.listView[t];
                return void 0 !== t ? this.document.get(t) : null
            }, this.getParent = function (t) {
                return this.__parents[t]
            }, this.getRoot = function (t) {
                for (var e = t; e;) t = e, e = this.getParent(t);
                return t
            }, this.update = function (t) {
                t = t.path;
                t[0] !== this.view.id && void 0 === this.__composites[t[0]] || this.rebuild()
            }, this.getLength = function () {
                return this.listView.length
            }, this.hasSuccessor = function (t) {
                return t < this.getLength() - 1
            }, this.hasPredecessor = function (t) {
                return 0 < t
            }, this.getPredecessor = function (t) {
                t = this.getPosition(t);
                return t <= 0 ? null : this.getNodeFromPosition(t - 1)
            }, this.getSuccessor = function (t) {
                t = this.getPosition(t);
                return t >= this.getLength() - 1 ? null : this.getNodeFromPosition(t + 1)
            }, this.firstChild = function (t) {
                var e;
                return t instanceof a ? (e = this.document.get(t.getNodes()[0]), this.firstChild(e)) : t
            }, this.lastChild = function (t) {
                var e;
                return t instanceof a ? (e = this.document.get(o.last(t.getNodes())), this.lastChild(e)) : t
            }, this.before = function (t) {
                t = this.firstChild(t);
                return [this.getPosition(t.id), 0]
            }, this.after = function (t) {
                t = this.lastChild(t);
                return [this.getPosition(t.id), t.getLength()]
            }
        }, r.prototype = o.extend(new r.Prototype, i.Events.Listener), Object.defineProperties(r.prototype, {
            id: {
                get: function () {
                    return this.view.id
                }
            }, type: {
                get: function () {
                    return this.view.type
                }
            }, nodes: {
                get: function () {
                    return this.view.nodes
                }, set: function (t) {
                    this.view.nodes = t
                }
            }
        }), e.exports = r
    }, {"../../substance/util": 182, "./composite": 169, underscore: 130}],
    171: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            this.view = (e = e || {}).view || "content", this.__document = t, this.container = t.get(this.view)
        }

        var o = t("underscore"), t = t("../../substance/util");
        r.Prototype = function () {
            this.getNodes = function (t) {
                return this.container.getNodes(t)
            }, this.getContainer = function () {
                return this.container
            }, this.getPosition = function (t, e) {
                return this.container.getPosition(t, e)
            }, this.getNodeFromPosition = function (t) {
                return this.container.getNodeFromPosition(t)
            }, this.getAnnotations = function (t) {
                return (t = t || {}).view = this.view, this.annotator.getAnnotations(t)
            }, this.get = function () {
                return this.__document.get.apply(this.__document, arguments)
            }, this.on = function () {
                return this.__document.on.apply(this.__document, arguments)
            }, this.off = function () {
                return this.__document.off.apply(this.__document, arguments)
            }, this.getDocument = function () {
                return this.__document
            }
        }, r.prototype = o.extend(new r.Prototype, t.Events.Listener), Object.defineProperties(r.prototype, {
            id: {
                get: function () {
                    return this.__document.id
                }, set: function () {
                    throw"immutable property"
                }
            }, nodeTypes: {
                get: function () {
                    return this.__document.nodeTypes
                }, set: function () {
                    throw"immutable property"
                }
            }, title: {
                get: function () {
                    return this.__document.get("document").title
                }, set: function () {
                    throw"immutable property"
                }
            }, updated_at: {
                get: function () {
                    return this.__document.get("document").updated_at
                }, set: function () {
                    throw"immutable property"
                }
            }, creator: {
                get: function () {
                    return this.__document.get("document").creator
                }, set: function () {
                    throw"immutable property"
                }
            }
        }), e.exports = r
    }, {"../../substance/util": 182, underscore: 130}],
    172: [function (t, e, n) {
        "use strict";

        function r(t) {
            a.Graph.call(this, t.schema, t), this.containers = {}, this.addIndex("annotations", {
                types: ["annotation"],
                property: "path"
            })
        }

        var s = t("underscore"), o = t("../../substance/util"), i = o.errors, a = t("../../substance/data"),
            c = t("./container"), u = i.define("DocumentError");
        r.schema = {
            indexes: {},
            types: {content: {properties: {}}, view: {properties: {nodes: ["array", "content"]}}}
        }, (r.Prototype = function () {
            var n = o.prototype(this);
            this.getIndex = function (t) {
                return this.indexes[t]
            }, this.getSchema = function () {
                return this.schema
            }, this.create = function (t) {
                return n.create.call(this, t), this.get(t.id)
            }, this.get = function (t) {
                var e, t = n.get.call(this, t);
                return t && ("view" === t.type ? (this.containers[t.id] || (this.containers[t.id] = new c(this, t)), this.containers[t.id]) : (!(e = void 0 !== (e = this.nodeTypes[t.type]) ? e.Model : null) || t instanceof e || (t = new e(t, this), this.nodes[t.id] = t), t))
            }, this.toJSON = function () {
                var t = n.toJSON.call(this);
                return t.id = this.id, t
            }, this.hide = function (t, e) {
                var n = this.get(t);
                if (!n) throw new u("Invalid view id: " + t);
                s.isString(e) && (e = [e]);
                var r = [];
                if (s.each(e, function (t) {
                    t = n.nodes.indexOf(t);
                    0 <= t && r.push(t)
                }, this), 0 !== r.length) {
                    r = r.sort().reverse();
                    for (var r = s.uniq(r), o = this.nodes[t], i = 0; i < r.length; i++) o.nodes.splice(r[i], 1)
                }
            }, this.show = function (t, e, n) {
                void 0 === n && (n = -1);
                var r = this.get(t);
                if (!r) throw new u("Invalid view id: " + t);
                t = r.nodes.length;
                (n = Math.min(n, t)) < 0 && (n = Math.max(0, t + n + 1)), r.nodes.splice(n, 0, e)
            }, this.fromSnapshot = function (t, e) {
                return r.fromSnapshot(t, e)
            }, this.uuid = function (t) {
                return t + "_" + o.uuid()
            }
        }).prototype = a.Graph.prototype, r.prototype = new r.Prototype, r.fromSnapshot = function (t, e) {
            return (e = e || {}).seed = t, new r(e)
        }, r.DocumentError = u, e.exports = r
    }, {"../../substance/data": 166, "../../substance/util": 182, "./container": 170, underscore: 130}],
    173: [function (t, e, n) {
        "use strict";
        t("underscore");
        var r = t("./document");
        r.Container = t("./container"), r.Controller = t("./controller"), r.Node = t("./node"), r.Composite = t("./composite"), r.TextNode = t("./text_node"), e.exports = r
    }, {
        "./composite": 169,
        "./container": 170,
        "./controller": 171,
        "./document": 172,
        "./node": 174,
        "./text_node": 175,
        underscore: 130
    }],
    174: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            this.document = e, this.properties = t
        }

        var o = t("underscore");
        r.type = {parent: "content", properties: {}}, r.properties = {
            abstract: !0,
            immutable: !0,
            mergeableWith: [],
            preventEmpty: !0,
            allowedAnnotations: []
        }, r.Prototype = function () {
            this.toJSON = function () {
                return o.clone(this.properties)
            }, this.getLength = function () {
                throw new Error("Node.getLength() is abstract.")
            }, this.getChangePosition = function (t) {
                throw new Error("Node.getCharPosition() is abstract.")
            }, this.insertOperation = function (t, e) {
                throw new Error("Node.insertOperation() is abstract.")
            }, this.deleteOperation = function (t, e) {
                throw new Error("Node.deleteOperation() is abstract.")
            }, this.canJoin = function (t) {
                return !1
            }, this.join = function (t) {
                throw new Error("Node.join() is abstract.")
            }, this.isBreakable = function () {
                return !1
            }, this.break = function (t, e) {
                throw new Error("Node.split() is abstract.")
            }, this.getAnnotations = function () {
                return this.document.getIndex("annotations").get(this.properties.id)
            }, this.includeInToc = function () {
                return !1
            }
        }, (((r.prototype = new r.Prototype).constructor = r).defineProperties = function (t, e, n) {
            var r = t;
            if (1 === arguments.length) {
                if (!(r = t.prototype) || !t.type) throw new Error("Illegal argument: expected NodeClass");
                e = Object.keys(t.type.properties)
            }
            o.each(e, function (e) {
                var t = {
                    get: function () {
                        return this.properties[e]
                    }
                };
                n || (t.set = function (t) {
                    return this.properties[e] = t, this
                }), Object.defineProperty(r, e, t)
            })
        })(r.prototype, ["id", "type"]), e.exports = r
    }, {underscore: 130}],
    175: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.call(this, t, e)
        }

        var o = t("./node");
        r.type = {
            id: "text",
            parent: "content",
            properties: {source_id: "Text element source id", content: "string"}
        }, r.description = {
            name: "Text",
            remarks: ["A simple text fragement that can be annotated. Usually text nodes are combined in a paragraph."],
            properties: {content: "Content"}
        }, r.example = {
            type: "paragraph",
            id: "paragraph_1",
            content: "Lorem ipsum dolor sit amet, adipiscing elit."
        }, (r.Prototype = function () {
            this.getLength = function () {
                return this.properties.content.length
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, o.defineProperties((r.prototype.constructor = r).prototype, ["content"]), e.exports = r
    }, {"./node": 174}],
    176: [function (t, e, n) {
        "use strict";
        var l = t("underscore"), u = t("./util.js"), t = {};

        function p(t, n) {
            var o = t.finally || function (t, e) {
                n(t, e)
            }, o = l.once(o), e = t.data || {}, i = t.functions;
            if (!l.isFunction(n)) return n("Illegal arguments: a callback function must be provided");
            var s = 0, a = void 0 === t.stopOnError || t.stopOnError, c = [];
            !function n(t) {
                var e = i[s];
                if (!e) return 0 < c.length ? o(new Error("Multiple errors occurred.", t)) : o(null, t);
                var r = l.once(function (t, e) {
                    if (t) {
                        if (a) return o(t, null);
                        c.push(t)
                    }
                    s += 1, n(e)
                });
                try {
                    0 === e.length ? (e(), r(null, t)) : 1 === e.length ? e(r) : e(t, r)
                } catch (t) {
                    console.log("util.async caught error:", t), u.printStackTrace(t), o(t)
                }
            }(e)
        }

        function r(u) {
            return function (t, n) {
                var e = u.selector ? u.selector(t) : u.items, r = u.finally || function (t, e) {
                    n(t, e)
                }, r = l.once(r);
                if (!e) return r(null, t);
                var o = l.isArray(e), i = (u.before && u.before(t), []), s = u.iterator;
                if (o) for (var a = 0; a < e.length; a++) i.push(function (n, r) {
                    return function (t, e) {
                        2 === s.length ? s(n, e) : 3 === s.length ? s(n, r, e) : s(n, r, t, e)
                    }
                }(e[a], a)); else for (var c in e) i.push(function (n, r) {
                    return function (t, e) {
                        2 === s.length ? s(n, e) : 3 === s.length ? s(n, r, e) : s(n, r, t, e)
                    }
                }(e[c], c));
                p({functions: i, data: t, finally: r, stopOnError: u.stopOnError}, n)
            }
        }

        t.sequential = function (t, e) {
            p(t = l.isArray(t) ? {functions: t} : t, e)
        }, t.iterator = function (t, e) {
            t = 1 == arguments.length ? t : {items: t, iterator: e};
            return r(t)
        }, t.each = function (t, e) {
            r(t)(null, e)
        }, e.exports = t
    }, {"./util.js": 184, underscore: 130}],
    177: [function (t, e, n) {
        "use strict";
        var r = t("underscore"), t = {
            ChildNodeIterator: function (t) {
                r.isArray(t) ? this.nodes = t : this.nodes = t.childNodes, this.length = this.nodes.length, this.pos = -1
            }
        };
        t.ChildNodeIterator.prototype = {
            hasNext: function () {
                return this.pos < this.length - 1
            }, next: function () {
                return this.pos += 1, this.nodes[this.pos]
            }, back: function () {
                return 0 <= this.pos && --this.pos, this
            }
        }, t.getChildren = function (t) {
            if (void 0 !== t.children) return t.children;
            for (var e = [], n = t.firstElementChild; n;) e.push(n), n = n.nextElementSibling;
            return e
        }, t.getNodeType = function (t) {
            return t.nodeType === window.Node.TEXT_NODE ? "text" : t.nodeType === window.Node.COMMENT_NODE ? "comment" : t.tagName ? t.tagName.toLowerCase() : (console.error("Can't get node type for ", t), "unknown")
        }, e.exports = t
    }, {underscore: 130}],
    178: [function (t, e, n) {
        "use strict";

        function a(t, e) {
            e ? (Error.call(this, t, e.fileName, e.lineNumber), e instanceof a ? this.__stack = e.__stack : e.stack ? this.__stack = r.parseStackTrace(e) : this.__stack = r.callstack(1)) : (Error.call(this, t), this.__stack = r.callstack(1)), this.message = t
        }

        var r = t("./util"), c = {};
        (a.Prototype = function () {
            this.name = "SubstanceError", this.code = -1, this.toString = function () {
                return this.name + ":" + this.message
            }, this.toJSON = function () {
                return {name: this.name, message: this.message, code: this.code, stack: this.stack}
            }, this.printStackTrace = function () {
                r.printStackTrace(this)
            }
        }).prototype = Error.prototype, a.prototype = new a.Prototype, Object.defineProperty(a.prototype, "stack", {
            get: function () {
                for (var t = [], e = 0; e < this.__stack.length; e++) {
                    var n = this.__stack[e];
                    t.push(n.file + ":" + n.line + ":" + n.col + " (" + n.func + ")")
                }
                return t.join("\n")
            }, set: function () {
                throw new Error("SubstanceError.stack is read-only.")
            }
        }), c.SubstanceError = a;
        c.define = function (t, e, n) {
            if (!t) throw new a("Name is required.");

            function r() {
            }

            o = n = n || a, i = t, s = e = void 0 === e ? -1 : e;
            var o, i, s, e = function (t) {
                o.call(this, t), this.name = i, this.code = s
            };
            return r.prototype = n.prototype, e.prototype = new r, e.prototype.constructor = e, c[t] = e
        }, e.exports = c
    }, {"./util": 184}],
    179: [function (t, e, n) {
        "use strict";

        function r(t) {
            this.levels = t || {}
        }

        var l = t("underscore");
        r.Prototype = function () {
            this.onText = function () {
            }, this.onEnter = function () {
                return null
            }, this.onExit = function () {
            }, this.enter = function (t, e) {
                return this.onEnter(t, e)
            }, this.exit = function (t, e) {
                this.onExit(t, e)
            }, this.createText = function (t, e) {
                this.onText(t, e)
            }, this.start = function (t, e, n) {
                for (var r = function (t) {
                    var n = [];
                    return l.each(t, function (t) {
                        var e = this.levels[t.type] || 1e3;
                        n.push({
                            pos: t.range[0],
                            mode: 1,
                            level: e,
                            id: t.id,
                            type: t.type,
                            node: t
                        }), n.push({pos: t.range[1], mode: -1, level: e, id: t.id, type: t.type, node: t})
                    }, this), n
                }.call(this, n), o = (r.sort(function (t, e) {
                    if (t.pos < e.pos) return -1;
                    if (t.pos > e.pos) return 1;
                    if (t.mode < e.mode) return -1;
                    if (t.mode > e.mode) return 1;
                    if (1 === t.mode) {
                        if (t.level < e.level) return -1;
                        if (t.level > e.level) return 1
                    }
                    if (-1 === t.mode) {
                        if (t.level > e.level) return -1;
                        if (t.level < e.level) return 1
                    }
                    return 0
                }.bind(this)), [{context: t, entry: null}]), i = 0, s = 0; s < r.length; s++) {
                    var a, c = r[s],
                        u = (this.createText(o[o.length - 1].context, e.substring(i, c.pos)), i = c.pos, 1);
                    if (1 === c.mode) {
                        for (; u < o.length && !(c.level < o[u].entry.level); u++) ;
                        o.splice(u, 0, {entry: c})
                    } else if (-1 === c.mode) {
                        for (; u < o.length && o[u].entry.id !== c.id; u++) ;
                        for (a = u; a < o.length; a++) this.exit(o[a].entry, o[a - 1].context);
                        o.splice(u, 1)
                    }
                    for (a = u; a < o.length; a++) o[a].context = this.enter(o[a].entry, o[a - 1].context)
                }
                this.createText(t, e.substring(i))
            }
        }, r.prototype = new r.Prototype, e.exports = r
    }, {underscore: 130}],
    180: [function (t, e, n) {
        "use strict";
        var t = t("underscore"), r = t.map, o = t.each;

        function i(t) {
            var e = {
                left: Number.POSITIVE_INFINITY,
                top: Number.POSITIVE_INFINITY,
                right: Number.NEGATIVE_INFINITY,
                bottom: Number.NEGATIVE_INFINITY,
                width: Number.NaN,
                height: Number.NaN
            };
            return o(t, function (t) {
                t.left < e.left && (e.left = t.left), t.top < e.top && (e.top = t.top), t.left + t.width > e.right && (e.right = t.left + t.width), t.top + t.height > e.bottom && (e.bottom = t.top + t.height)
            }), e.width = e.right - e.left, e.height = e.bottom - e.top, e
        }

        e.exports = function (t, o) {
            void 0 === t.length && (t = [t]);
            var t = r(t, function (t) {
                return t = t, e = (e = o).getBoundingClientRect(), n = (t = i(t.getClientRects())).left - e.left, r = t.top - e.top, {
                    left: n,
                    top: r,
                    right: e.width - n - t.width,
                    bottom: e.height - r - t.height,
                    width: t.width,
                    height: t.height
                };
                var e, n, r
            }), t = i(t), e = o.getBoundingClientRect();
            return {
                left: t.left,
                top: t.top,
                right: e.width - t.left - t.width,
                bottom: e.height - t.top - t.height,
                width: t.width,
                height: t.height
            }
        }
    }, {underscore: 130}],
    181: [function (t, e, n) {
        "use strict";
        var r = {}, o = t("underscore");
        r.templates = {}, r.renderTemplate = function (t, e) {
            return r.templates[t](e)
        }, "undefined" == typeof window || window.console || (window.console = {
            log: function () {
            }
        }), r.tpl = function (t, e) {
            e = e || {};
            t = window.$("script[name=" + t + "]").html();
            return o.template(t, e)
        }, e.exports = r
    }, {underscore: 130}],
    182: [function (t, e, n) {
        "use strict";
        var r = t("./util");
        r.async = t("./async"), r.errors = t("./errors"), r.html = t("./html"), r.dom = t("./dom"), r.RegExp = t("./regexp"), r.Fragmenter = t("./fragmenter"), e.exports = r
    }, {
        "./async": 176,
        "./dom": 177,
        "./errors": 178,
        "./fragmenter": 179,
        "./html": 181,
        "./regexp": 183,
        "./util": 184
    }],
    183: [function (t, e, n) {
        "use strict";

        function r(t) {
            this.index = t.index, this.match = [];
            for (var e = 0; e < t.length; e++) this.match.push(t[e])
        }

        function o(t) {
            this.exp = t
        }

        r.Prototype = function () {
            this.captures = function () {
                return this.match.slice(1)
            }, this.toString = function () {
                return this.match[0]
            }
        }, r.prototype = new r.Prototype;
        o.Prototype = function () {
            this.match = function (t) {
                if (void 0 === t) throw new Error("No string given");
                if (this.exp.global) {
                    var e, n = [];
                    for (this.exp.compile(this.exp); null !== (e = this.exp.exec(t));) n.push(new r(e));
                    return n
                }
                return this.exp.exec(t)
            }
        }, o.prototype = new o.Prototype, o.Match = r, e.exports = o
    }, {}],
    184: [function (r, t, e) {
        "use strict";

        function o(t, e) {
            var n, r = -1, o = t.length, i = e[0], s = e[1], a = e[2];
            switch (e.length) {
                case 0:
                    for (; ++r < o;) (n = t[r]).callback.call(n.ctx);
                    return;
                case 1:
                    for (; ++r < o;) (n = t[r]).callback.call(n.ctx, i);
                    return;
                case 2:
                    for (; ++r < o;) (n = t[r]).callback.call(n.ctx, i, s);
                    return;
                case 3:
                    for (; ++r < o;) (n = t[r]).callback.call(n.ctx, i, s, a);
                    return;
                default:
                    for (; ++r < o;) (n = t[r]).callback.apply(n.ctx, e)
            }
        }

        function p(t, e, n, r) {
            if (!n) return 1;
            if ("object" == typeof n) for (var o in n) t[e].apply(t, [o, n[o]].concat(r)); else {
                if (!c.test(n)) return 1;
                for (var i = n.split(c), s = 0, a = i.length; s < a; s++) t[e].apply(t, [i[s]].concat(r))
            }
        }

        function i() {
        }

        var h = r("underscore"), s = {
            uuid: function (t, e) {
                var n, r, o = "0123456789abcdefghijklmnopqrstuvwxyz".split(""), i = [];
                if (e = e || 32) for (n = 0; n < e; n++) i[n] = o[0 | 16 * Math.random()]; else for (i[8] = i[13] = i[18] = i[23] = "-", i[14] = "4", n = 0; n < 36; n++) i[n] || (r = 0 | 16 * Math.random(), i[n] = o[19 == n ? 3 & r | 8 : r]);
                return (t || "") + i.join("")
            }, uuidGen: function (e) {
                var n = 1;
                return e = void 0 !== e ? e : "uuid_", function (t) {
                    return (t = t || e) + n++
                }
            }
        }, c = /\s+/;
        s.Events = {
            on: function (t, e, n) {
                return p(this, "on", t, [e, n]) && e && (this._events = this._events || {}, (this._events[t] || (this._events[t] = [])).push({
                    callback: e,
                    context: n,
                    ctx: n || this
                })), this
            }, once: function (t, e, n) {
                if (!p(this, "once", t, [e, n]) || !e) return this;
                var r = this, o = h.once(function () {
                    r.off(t, o), e.apply(this, arguments)
                });
                return o._callback = e, this.on(t, o, n)
            }, off: function (t, e, n) {
                var r, o, i, s, a, c, u, l;
                if (!this._events || !p(this, "off", t, [e, n])) return this;
                if (!t && !e && !n) return this._events = {}, this;
                for (a = 0, c = (s = t ? [t] : h.keys(this._events)).length; a < c; a++) if (t = s[a], i = this._events[t]) {
                    if (this._events[t] = r = [], e || n) for (u = 0, l = i.length; u < l; u++) o = i[u], (e && e !== o.callback && e !== o.callback._callback || n && n !== o.context) && r.push(o);
                    r.length || delete this._events[t]
                }
                return this
            }, trigger: function (t) {
                if (!this._events) return this;
                var e = Array.prototype.slice.call(arguments, 1);
                if (!p(this, "trigger", t, e)) return this;
                var t = this._events[t], n = this._events.all;
                return t && o(t, e), n && o(n, arguments), this
            }, triggerLater: function () {
                var t = this, e = arguments;
                window.setTimeout(function () {
                    t.trigger.apply(t, e)
                }, 0)
            }, stopListening: function (t, e, n) {
                var r = this._listeners;
                if (!r) return this;
                var o, i = !e && !n;
                for (o in "object" == typeof e && (n = this), t && ((r = {})[t._listenerId] = t), r) r[o].off(e, n, this), i && delete this._listeners[o];
                return this
            }
        }, h.each({listenTo: "on", listenToOnce: "once"}, function (r, t) {
            s.Events[t] = function (t, e, n) {
                return ((this._listeners || (this._listeners = {}))[t._listenerId || (t._listenerId = h.uniqueId("l"))] = t)[r](e, n = "object" == typeof e ? this : n, this), this
            }
        }), s.Events.bind = s.Events.on, s.Events.unbind = s.Events.off, s.Events.Listener = {
            listenTo: function (t, e, n) {
                if (h.isFunction(n)) return this._handlers = this._handlers || [], t.on(e, n, this), this._handlers.push({
                    unbind: function () {
                        t.off(e, n)
                    }
                }), this;
                throw new Error("Illegal argument: expecting function as callback, was: " + n)
            }, stopListening: function () {
                if (this._handlers) for (var t = 0; t < this._handlers.length; t++) this._handlers[t].unbind()
            }
        }, s.propagate = function (e, n) {
            if (h.isFunction(n)) return function (t) {
                if (t) return n(t);
                n(null, e)
            };
            throw"Illegal argument: provided callback is not a function"
        };
        s.inherits = function (t, e, n) {
            var r = e && e.hasOwnProperty("constructor") ? e.constructor : function () {
                t.apply(this, arguments)
            };
            return h.extend(r, t), i.prototype = t.prototype, r.prototype = new i, e && h.extend(r.prototype, e), n && h.extend(r, n), (r.prototype.constructor = r).__super__ = t.prototype, r
        }, s.getJSON = function (t, e) {
            var n;
            "undefined" == typeof window || "undefined" != typeof nwglobal ? (n = r("fs"), n = JSON.parse(n.readFileSync(t, "utf8")), e(null, n)) : window.$.getJSON(t).done(function (t) {
                e(null, t)
            }).error(function (t) {
                e(t, null)
            })
        }, s.prototype = function (t) {
            return Object.getPrototypeOf ? Object.getPrototypeOf(t) : t.__proto__
        }, s.inherit = function (t, e) {
            var n, t = h.isFunction(t) ? new t : t, t = h.isFunction(e) ? (e.prototype = t, new e) : ((n = function () {
            }).prototype = t, h.extend(new n, e));
            return t
        }, s.pimpl = function (t) {
            function e(t) {
                this.self = t
            }

            return e.prototype = t, function (t) {
                return new e(t = t || this)
            }
        }, s.parseStackTrace = function (t) {
            for (var e = /([^@]*)@(.*):(\d+)/, n = /\s*at ([^(]*)[(](.*):(\d+):(\d+)[)]/, r = t.stack.split("\n"), o = [], i = 0; i < r.length; i++) {
                var s, a = e.exec(r[i]);
                (a = a || n.exec(r[i])) ? "" === (s = {
                    func: a[1],
                    file: a[2],
                    line: a[3],
                    col: a[4] || 0
                }).func && (s.func = "<anonymous>") : s = {func: "", file: r[i], line: "", col: ""}, o.push(s)
            }
            return o
        }, s.callstack = function (t) {
            var e;
            try {
                throw new Error
            } catch (t) {
                e = t
            }
            return s.parseStackTrace(e).splice((t = t || 0) + 1)
        }, s.stacktrace = function (t) {
            var t = 0 === arguments.length ? s.callstack().splice(1) : s.parseStackTrace(t), e = [];
            return h.each(t, function (t) {
                e.push(t.file + ":" + t.line + ":" + t.col + " (" + t.func + ")")
            }), e.join("\n")
        }, s.printStackTrace = function (t, e) {
            if (t.stack) {
                var n;
                if (void 0 !== t.__stack) n = t.__stack; else {
                    if (!h.isString(t.stack)) return;
                    n = s.parseStackTrace(t)
                }
                e = e || n.length, e = Math.min(e, n.length);
                for (var r = 0; r < e; r++) {
                    var o = n[r];
                    console.log(o.file + ":" + o.line + ":" + o.col, "(" + o.func + ")")
                }
            }
        }, s.diff = function (n, r) {
            var o;
            return h.isArray(n) && h.isArray(r) ? 0 === (o = h.difference(r, n)).length ? null : o : h.isObject(n) && h.isObject(r) ? (o = {}, h.each(Object.keys(r), function (t) {
                var e = s.diff(n[t], r[t]);
                e && (o[t] = e)
            }), h.isEmpty(o) ? null : o) : n !== r ? r : void 0
        }, s.deepclone = function (t) {
            if (void 0 !== t) return null === t ? null : JSON.parse(JSON.stringify(t))
        }, s.clone = function (t) {
            return null == t ? t : h.isFunction(t.clone) ? t.clone() : s.deepclone(t)
        }, s.freeze = function (t) {
            if (h.isObject(t)) {
                if (Object.isFrozen(t)) return t;
                for (var e = Object.keys(t), n = 0; n < e.length; n++) {
                    var r = e[n];
                    t[r] = s.freeze(t[r])
                }
                return Object.freeze(t)
            }
            if (h.isArray(t)) {
                var o = t;
                for (n = 0; n < o.length; n++) o[n] = s.freeze(o[n]);
                return Object.freeze(o)
            }
            return t
        }, s.later = function (e, n) {
            return function () {
                var t = arguments;
                window.setTimeout(function () {
                    e.apply(n, t)
                }, 0)
            }
        }, s.isEmpty = function (t) {
            return !t.match(/\w/)
        }, s.slug = function (t) {
            t = (t = t.replace(/^\s+|\s+$/g, "")).toLowerCase();
            for (var e = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;", n = 0, r = e.length; n < r; n++) t = t.replace(new RegExp(e.charAt(n), "g"), "aaaaeeeeiiiioooouuuunc------".charAt(n));
            return t = t.replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")
        }, s.getReadableFileSizeString = function (t) {
            for (var e = -1; e++, 1024 < (t /= 1024);) ;
            return Math.max(t, .1).toFixed(1) + [" kB", " MB", " GB", " TB", "PB", "EB", "ZB", "YB"][e]
        }, t.exports = s
    }, {fs: 2, underscore: 130}],
    185: [function (t, W, X) {
        !function (J) {
            !function () {
                !function () {
                    function c(o, i) {
                        return i = null == i ? o.length - 1 : +i, function () {
                            for (var t = Math.max(arguments.length - i, 0), e = Array(t), n = 0; n < t; n++) e[n] = arguments[n + i];
                            switch (i) {
                                case 0:
                                    return o.call(this, e);
                                case 1:
                                    return o.call(this, arguments[0], e);
                                case 2:
                                    return o.call(this, arguments[0], arguments[1], e)
                            }
                            for (var r = Array(i + 1), n = 0; n < i; n++) r[n] = arguments[n];
                            return r[i] = e, o.apply(this, r)
                        }
                    }

                    function t(e) {
                        return function (t) {
                            return null == t ? void 0 : t[e]
                        }
                    }

                    function s(t, e) {
                        for (var n = e.length, r = 0; r < n; r++) {
                            if (null == t) return;
                            t = t[e[r]]
                        }
                        return n ? t : void 0
                    }

                    function e(h) {
                        return function (t, e, n, r) {
                            var o = 3 <= arguments.length, i = t, s = T(e, r, 4), a = n, c = !E(i) && k.keys(i),
                                u = (c || i).length, l = 0 < h ? 0 : u - 1;
                            for (o || (a = i[c ? c[l] : l], l += h); 0 <= l && l < u; l += h) {
                                var p = c ? c[l] : l;
                                a = s(a, i[p], p, i)
                            }
                            return a
                        }
                    }

                    function n(i, e) {
                        return function (n, r, t) {
                            var o = e ? [[], []] : {};
                            return r = A(r, t), k.each(n, function (t, e) {
                                e = r(t, e, n);
                                i(o, t, e)
                            }), o
                        }
                    }

                    function r(i) {
                        return function (t, e, n) {
                            e = A(e, n);
                            for (var r = j(t), o = 0 < i ? 0 : r - 1; 0 <= o && o < r; o += i) if (e(t[o], o, t)) return o;
                            return -1
                        }
                    }

                    function o(i, s, a) {
                        return function (t, e, n) {
                            var r = 0, o = j(t);
                            if ("number" == typeof n) 0 < i ? r = 0 <= n ? n : Math.max(n + o, r) : o = 0 <= n ? Math.min(n + 1, o) : n + o + 1; else if (a && n && o) return t[n = a(t, e)] === e ? n : -1;
                            if (e != e) return 0 <= (n = s(b.call(t, r, o), k.isNaN)) ? n + r : -1;
                            for (n = 0 < i ? r : o - 1; 0 <= n && n < o; n += i) if (t[n] === e) return n;
                            return -1
                        }
                    }

                    function u(t, e, n, r, o) {
                        return r instanceof e ? (r = S(t.prototype), e = t.apply(r, o), k.isObject(e) ? e : r) : t.apply(n, o)
                    }

                    function i(t, e) {
                        var n = H.length, r = t.constructor, o = k.isFunction(r) && r.prototype || m, i = "constructor";
                        for (V(t, i) && !k.contains(e, i) && e.push(i); n--;) (i = H[n]) in t && t[i] !== o[i] && !k.contains(e, i) && e.push(i)
                    }

                    function a(c, u) {
                        return function (t) {
                            var e = arguments.length;
                            if (u && (t = Object(t)), e < 2 || null == t) return t;
                            for (var n = 1; n < e; n++) for (var r = arguments[n], o = c(r), i = o.length, s = 0; s < i; s++) {
                                var a = o[s];
                                u && void 0 !== t[a] || (t[a] = r[a])
                            }
                            return t
                        }
                    }

                    function O(t, e, n) {
                        return e in n
                    }

                    function l(e) {
                        function n(t) {
                            return e[t]
                        }

                        var t = "(?:" + k.keys(e).join("|") + ")", r = RegExp(t), o = RegExp(t, "g");
                        return function (t) {
                            return r.test(t = null == t ? "" : "" + t) ? t.replace(o, n) : t
                        }
                    }

                    function q(t) {
                        return "\\" + z[t]
                    }

                    function p(t, e) {
                        return t._chain ? k(e).chain() : e
                    }

                    var h, d, f,
                        g = "object" == typeof self && self.self === self && self || "object" == typeof J && J.global === J && J || this || {},
                        L = g._, y = Array.prototype, m = Object.prototype,
                        v = "undefined" != typeof Symbol ? Symbol.prototype : null, R = y.push, b = y.slice,
                        w = m.toString, _ = m.hasOwnProperty, x = Array.isArray, C = Object.keys, P = Object.create,
                        N = function () {
                        }, k = function (t) {
                            return t instanceof k ? t : this instanceof k ? void (this._wrapped = t) : new k(t)
                        },
                        T = (void 0 === X || X.nodeType ? g._ = k : (X = void 0 !== W && !W.nodeType && W.exports ? W.exports = k : X)._ = k, k.VERSION = "1.9.2", function (o, i, t) {
                            if (void 0 === i) return o;
                            switch (null == t ? 3 : t) {
                                case 1:
                                    return function (t) {
                                        return o.call(i, t)
                                    };
                                case 3:
                                    return function (t, e, n) {
                                        return o.call(i, t, e, n)
                                    };
                                case 4:
                                    return function (t, e, n, r) {
                                        return o.call(i, t, e, n, r)
                                    }
                            }
                            return function () {
                                return o.apply(i, arguments)
                            }
                        }), A = function (t, e, n) {
                            return k.iteratee !== h ? k.iteratee(t, e) : null == t ? k.identity : k.isFunction(t) ? T(t, e, n) : k.isObject(t) && !k.isArray(t) ? k.matcher(t) : k.property(t)
                        }, S = (k.iteratee = h = function (t, e) {
                            return A(t, e, 1 / 0)
                        }, function (t) {
                            if (!k.isObject(t)) return {};
                            if (P) return P(t);
                            N.prototype = t;
                            t = new N;
                            return N.prototype = null, t
                        }), V = function (t, e) {
                            return null != t && _.call(t, e)
                        }, F = Math.pow(2, 53) - 1, j = t("length"), E = function (t) {
                            t = j(t);
                            return "number" == typeof t && 0 <= t && t <= F
                        }, D = (k.each = k.forEach = function (t, e, n) {
                            if (e = T(e, n), E(t)) for (o = 0, i = t.length; o < i; o++) e(t[o], o, t); else for (var r = k.keys(t), o = 0, i = r.length; o < i; o++) e(t[r[o]], r[o], t);
                            return t
                        }, k.map = k.collect = function (t, e, n) {
                            e = A(e, n);
                            for (var r = !E(t) && k.keys(t), o = (r || t).length, i = Array(o), s = 0; s < o; s++) {
                                var a = r ? r[s] : s;
                                i[s] = e(t[a], a, t)
                            }
                            return i
                        }, k.reduce = k.foldl = k.inject = e(1), k.reduceRight = k.foldr = e(-1), k.find = k.detect = function (t, e, n) {
                            e = (E(t) ? k.findIndex : k.findKey)(t, e, n);
                            if (void 0 !== e && -1 !== e) return t[e]
                        }, k.filter = k.select = function (t, r, e) {
                            var o = [];
                            return r = A(r, e), k.each(t, function (t, e, n) {
                                r(t, e, n) && o.push(t)
                            }), o
                        }, k.reject = function (t, e, n) {
                            return k.filter(t, k.negate(A(e)), n)
                        }, k.every = k.all = function (t, e, n) {
                            e = A(e, n);
                            for (var r = !E(t) && k.keys(t), o = (r || t).length, i = 0; i < o; i++) {
                                var s = r ? r[i] : i;
                                if (!e(t[s], s, t)) return !1
                            }
                            return !0
                        }, k.some = k.any = function (t, e, n) {
                            e = A(e, n);
                            for (var r = !E(t) && k.keys(t), o = (r || t).length, i = 0; i < o; i++) {
                                var s = r ? r[i] : i;
                                if (e(t[s], s, t)) return !0
                            }
                            return !1
                        }, k.contains = k.includes = k.include = function (t, e, n, r) {
                            return E(t) || (t = k.values(t)), 0 <= k.indexOf(t, e, n = "number" == typeof n && !r ? n : 0)
                        }, k.invoke = c(function (t, n, r) {
                            var o, i;
                            return k.isFunction(n) ? i = n : k.isArray(n) && (o = n.slice(0, -1), n = n[n.length - 1]), k.map(t, function (t) {
                                var e = i;
                                if (!e) {
                                    if (null == (t = o && o.length ? s(t, o) : t)) return;
                                    e = t[n]
                                }
                                return null == e ? e : e.apply(t, r)
                            })
                        }), k.pluck = function (t, e) {
                            return k.map(t, k.property(e))
                        }, k.where = function (t, e) {
                            return k.filter(t, k.matcher(e))
                        }, k.findWhere = function (t, e) {
                            return k.find(t, k.matcher(e))
                        }, k.max = function (t, r, e) {
                            var n, o, i = -1 / 0, s = -1 / 0;
                            if (null == r || "number" == typeof r && "object" != typeof t[0] && null != t) for (var a = 0, c = (t = E(t) ? t : k.values(t)).length; a < c; a++) null != (n = t[a]) && i < n && (i = n); else r = A(r, e), k.each(t, function (t, e, n) {
                                o = r(t, e, n), (s < o || o === -1 / 0 && i === -1 / 0) && (i = t, s = o)
                            });
                            return i
                        }, k.min = function (t, r, e) {
                            var n, o, i = 1 / 0, s = 1 / 0;
                            if (null == r || "number" == typeof r && "object" != typeof t[0] && null != t) for (var a = 0, c = (t = E(t) ? t : k.values(t)).length; a < c; a++) null != (n = t[a]) && n < i && (i = n); else r = A(r, e), k.each(t, function (t, e, n) {
                                ((o = r(t, e, n)) < s || o === 1 / 0 && i === 1 / 0) && (i = t, s = o)
                            });
                            return i
                        }, k.shuffle = function (t) {
                            return k.sample(t, 1 / 0)
                        }, k.sample = function (t, e, n) {
                            if (null == e || n) return (t = E(t) ? t : k.values(t))[k.random(t.length - 1)];
                            for (var r = E(t) ? k.clone(t) : k.values(t), n = j(r), o = (e = Math.max(Math.min(e, n), 0), n - 1), i = 0; i < e; i++) {
                                var s = k.random(i, o), a = r[i];
                                r[i] = r[s], r[s] = a
                            }
                            return r.slice(0, e)
                        }, k.sortBy = function (t, r, e) {
                            var o = 0;
                            return r = A(r, e), k.pluck(k.map(t, function (t, e, n) {
                                return {value: t, index: o++, criteria: r(t, e, n)}
                            }).sort(function (t, e) {
                                var n = t.criteria, r = e.criteria;
                                if (n !== r) {
                                    if (r < n || void 0 === n) return 1;
                                    if (n < r || void 0 === r) return -1
                                }
                                return t.index - e.index
                            }), "value")
                        }, k.groupBy = n(function (t, e, n) {
                            V(t, n) ? t[n].push(e) : t[n] = [e]
                        }), k.indexBy = n(function (t, e, n) {
                            t[n] = e
                        }), k.countBy = n(function (t, e, n) {
                            V(t, n) ? t[n]++ : t[n] = 1
                        }), /[^\ud800-\udfff]|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff]/g),
                        I = (k.toArray = function (t) {
                            return t ? k.isArray(t) ? b.call(t) : k.isString(t) ? t.match(D) : E(t) ? k.map(t, k.identity) : k.values(t) : []
                        }, k.size = function (t) {
                            return null == t ? 0 : (E(t) ? t : k.keys(t)).length
                        }, k.partition = n(function (t, e, n) {
                            t[n ? 0 : 1].push(e)
                        }, !0), k.first = k.head = k.take = function (t, e, n) {
                            return null == t || t.length < 1 ? null == e ? void 0 : [] : null == e || n ? t[0] : k.initial(t, t.length - e)
                        }, k.initial = function (t, e, n) {
                            return b.call(t, 0, Math.max(0, t.length - (null == e || n ? 1 : e)))
                        }, k.last = function (t, e, n) {
                            return null == t || t.length < 1 ? null == e ? void 0 : [] : null == e || n ? t[t.length - 1] : k.rest(t, Math.max(0, t.length - e))
                        }, k.rest = k.tail = k.drop = function (t, e, n) {
                            return b.call(t, null == e || n ? 1 : e)
                        }, k.compact = function (t) {
                            return k.filter(t, Boolean)
                        }, function (t, e, n, r) {
                            for (var o = (r = r || []).length, i = 0, s = j(t); i < s; i++) {
                                var a = t[i];
                                if (E(a) && (k.isArray(a) || k.isArguments(a))) if (e) for (var c = 0, u = a.length; c < u;) r[o++] = a[c++]; else I(a, e, n, r), o = r.length; else n || (r[o++] = a)
                            }
                            return r
                        }), $ = (k.flatten = function (t, e) {
                            return I(t, e, !1)
                        }, k.without = c(function (t, e) {
                            return k.difference(t, e)
                        }), k.uniq = k.unique = function (t, e, n, r) {
                            k.isBoolean(e) || (r = n, n = e, e = !1), null != n && (n = A(n, r));
                            for (var o = [], i = [], s = 0, a = j(t); s < a; s++) {
                                var c = t[s], u = n ? n(c, s, t) : c;
                                e && !n ? (s && i === u || o.push(c), i = u) : n ? k.contains(i, u) || (i.push(u), o.push(c)) : k.contains(o, c) || o.push(c)
                            }
                            return o
                        }, k.union = c(function (t) {
                            return k.uniq(I(t, !0, !0))
                        }), k.intersection = function (t) {
                            for (var e = [], n = arguments.length, r = 0, o = j(t); r < o; r++) {
                                var i = t[r];
                                if (!k.contains(e, i)) {
                                    for (var s = 1; s < n && k.contains(arguments[s], i); s++) ;
                                    s === n && e.push(i)
                                }
                            }
                            return e
                        }, k.difference = c(function (t, e) {
                            return e = I(e, !0, !0), k.filter(t, function (t) {
                                return !k.contains(e, t)
                            })
                        }), k.unzip = function (t) {
                            for (var e = t && k.max(t, j).length || 0, n = Array(e), r = 0; r < e; r++) n[r] = k.pluck(t, r);
                            return n
                        }, k.zip = c(k.unzip), k.object = function (t, e) {
                            for (var n = {}, r = 0, o = j(t); r < o; r++) e ? n[t[r]] = e[r] : n[t[r][0]] = t[r][1];
                            return n
                        }, k.findIndex = r(1), k.findLastIndex = r(-1), k.sortedIndex = function (t, e, n, r) {
                            for (var o = (n = A(n, r, 1))(e), i = 0, s = j(t); i < s;) {
                                var a = Math.floor((i + s) / 2);
                                n(t[a]) < o ? i = a + 1 : s = a
                            }
                            return i
                        }, k.indexOf = o(1, k.findIndex, k.sortedIndex), k.lastIndexOf = o(-1, k.findLastIndex), k.range = function (t, e, n) {
                            null == e && (e = t || 0, t = 0), n = n || (e < t ? -1 : 1);
                            for (var r = Math.max(Math.ceil((e - t) / n), 0), o = Array(r), i = 0; i < r; i++, t += n) o[i] = t;
                            return o
                        }, k.chunk = function (t, e) {
                            if (null == e || e < 1) return [];
                            for (var n = [], r = 0, o = t.length; r < o;) n.push(b.call(t, r, r += e));
                            return n
                        }, k.bind = c(function (e, n, r) {
                            if (!k.isFunction(e)) throw new TypeError("Bind must be called on a function");
                            var o = c(function (t) {
                                return u(e, o, n, this, r.concat(t))
                            });
                            return o
                        }), k.partial = c(function (o, i) {
                            function s() {
                                for (var t = 0, e = i.length, n = Array(e), r = 0; r < e; r++) n[r] = i[r] === a ? arguments[t++] : i[r];
                                for (; t < arguments.length;) n.push(arguments[t++]);
                                return u(o, s, this, this, n)
                            }

                            var a = k.partial.placeholder;
                            return s
                        }), (k.partial.placeholder = k).bindAll = c(function (t, e) {
                            var n = (e = I(e, !1, !1)).length;
                            if (n < 1) throw new Error("bindAll must be passed function names");
                            for (; n--;) {
                                var r = e[n];
                                t[r] = k.bind(t[r], t)
                            }
                        }), k.memoize = function (r, o) {
                            function i(t) {
                                var e = i.cache, n = "" + (o ? o.apply(this, arguments) : t);
                                return V(e, n) || (e[n] = r.apply(this, arguments)), e[n]
                            }

                            return i.cache = {}, i
                        }, k.delay = c(function (t, e, n) {
                            return setTimeout(function () {
                                return t.apply(null, n)
                            }, e)
                        }), k.defer = k.partial(k.delay, k, 1), k.throttle = function (n, r, o) {
                            function i() {
                                l = !1 === o.leading ? 0 : k.now(), s = null, u = n.apply(a, c), s || (a = c = null)
                            }

                            function t() {
                                var t = k.now(), e = (l || !1 !== o.leading || (l = t), r - (t - l));
                                return a = this, c = arguments, e <= 0 || r < e ? (s && (clearTimeout(s), s = null), l = t, u = n.apply(a, c), s || (a = c = null)) : s || !1 === o.trailing || (s = setTimeout(i, e)), u
                            }

                            var s, a, c, u, l = 0;
                            o = o || {};
                            return t.cancel = function () {
                                clearTimeout(s), l = 0, s = a = c = null
                            }, t
                        }, k.debounce = function (n, r, o) {
                            function i(t, e) {
                                s = null, e && (a = n.apply(t, e))
                            }

                            var s, a, t = c(function (t) {
                                var e;
                                return s && clearTimeout(s), o ? (e = !s, s = setTimeout(i, r), e && (a = n.apply(this, t))) : s = k.delay(i, r, this, t), a
                            });
                            return t.cancel = function () {
                                clearTimeout(s), s = null
                            }, t
                        }, k.wrap = function (t, e) {
                            return k.partial(e, t)
                        }, k.negate = function (t) {
                            return function () {
                                return !t.apply(this, arguments)
                            }
                        }, k.compose = function () {
                            var n = arguments, r = n.length - 1;
                            return function () {
                                for (var t = r, e = n[r].apply(this, arguments); t--;) e = n[t].call(this, e);
                                return e
                            }
                        }, k.after = function (t, e) {
                            return function () {
                                if (--t < 1) return e.apply(this, arguments)
                            }
                        }, k.before = function (t, e) {
                            var n;
                            return function () {
                                return 0 < --t && (n = e.apply(this, arguments)), t <= 1 && (e = null), n
                            }
                        }, k.once = k.partial(k.before, 2), k.restArguments = c, !{toString: null}.propertyIsEnumerable("toString")),
                        H = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"],
                        x = (k.keys = function (t) {
                            if (!k.isObject(t)) return [];
                            if (C) return C(t);
                            var e, n = [];
                            for (e in t) V(t, e) && n.push(e);
                            return $ && i(t, n), n
                        }, k.allKeys = function (t) {
                            if (!k.isObject(t)) return [];
                            var e, n = [];
                            for (e in t) n.push(e);
                            return $ && i(t, n), n
                        }, k.values = function (t) {
                            for (var e = k.keys(t), n = e.length, r = Array(n), o = 0; o < n; o++) r[o] = t[e[o]];
                            return r
                        }, k.mapObject = function (t, e, n) {
                            e = A(e, n);
                            for (var r = k.keys(t), o = r.length, i = {}, s = 0; s < o; s++) {
                                var a = r[s];
                                i[a] = e(t[a], a, t)
                            }
                            return i
                        }, k.pairs = function (t) {
                            for (var e = k.keys(t), n = e.length, r = Array(n), o = 0; o < n; o++) r[o] = [e[o], t[e[o]]];
                            return r
                        }, k.invert = function (t) {
                            for (var e = {}, n = k.keys(t), r = 0, o = n.length; r < o; r++) e[t[n[r]]] = n[r];
                            return e
                        }, k.functions = k.methods = function (t) {
                            var e, n = [];
                            for (e in t) k.isFunction(t[e]) && n.push(e);
                            return n.sort()
                        }, k.extend = a(k.allKeys), k.extendOwn = k.assign = a(k.keys), k.findKey = function (t, e, n) {
                            e = A(e, n);
                            for (var r, o = k.keys(t), i = 0, s = o.length; i < s; i++) if (e(t[r = o[i]], r, t)) return r
                        }, k.pick = c(function (t, e) {
                            var n = {}, r = e[0];
                            if (null == t) return n;
                            k.isFunction(r) ? (1 < e.length && (r = T(r, e[1])), e = k.allKeys(t)) : (r = O, e = I(e, !1, !1), t = Object(t));
                            for (var o = 0, i = e.length; o < i; o++) {
                                var s = e[o], a = t[s];
                                r(a, s, t) && (n[s] = a)
                            }
                            return n
                        }), k.omit = c(function (t, n) {
                            var e, r = n[0];
                            return k.isFunction(r) ? (r = k.negate(r), 1 < n.length && (e = n[1])) : (n = k.map(I(n, !1, !1), String), r = function (t, e) {
                                return !k.contains(n, e)
                            }), k.pick(t, r, e)
                        }), k.defaults = a(k.allKeys, !0), k.create = function (t, e) {
                            t = S(t);
                            return e && k.extendOwn(t, e), t
                        }, k.clone = function (t) {
                            return k.isObject(t) ? k.isArray(t) ? t.slice() : k.extend({}, t) : t
                        }, k.tap = function (t, e) {
                            return e(t), t
                        }, k.isMatch = function (t, e) {
                            var n = k.keys(e), r = n.length;
                            if (null == t) return !r;
                            for (var o = Object(t), i = 0; i < r; i++) {
                                var s = n[i];
                                if (e[s] !== o[s] || !(s in o)) return !1
                            }
                            return !0
                        }, d = function (t, e, n, r) {
                            if (t === e) return 0 !== t || 1 / t == 1 / e;
                            if (null == t || null == e) return !1;
                            if (t != t) return e != e;
                            var o = typeof t;
                            return ("function" == o || "object" == o || "object" == typeof e) && f(t, e, n, r)
                        }, f = function (t, e, n, r) {
                            t instanceof k && (t = t._wrapped), e instanceof k && (e = e._wrapped);
                            var o = w.call(t);
                            if (o !== w.call(e)) return !1;
                            switch (o) {
                                case"[object RegExp]":
                                case"[object String]":
                                    return "" + t == "" + e;
                                case"[object Number]":
                                    return +t != +t ? +e != +e : 0 == +t ? 1 / +t == 1 / e : +t == +e;
                                case"[object Date]":
                                case"[object Boolean]":
                                    return +t == +e;
                                case"[object Symbol]":
                                    return v.valueOf.call(t) === v.valueOf.call(e)
                            }
                            o = "[object Array]" === o;
                            if (!o) {
                                if ("object" != typeof t || "object" != typeof e) return !1;
                                var i = t.constructor, s = e.constructor;
                                if (i !== s && !(k.isFunction(i) && i instanceof i && k.isFunction(s) && s instanceof s) && "constructor" in t && "constructor" in e) return !1
                            }
                            r = r || [];
                            for (var a = (n = n || []).length; a--;) if (n[a] === t) return r[a] === e;
                            if (n.push(t), r.push(e), o) {
                                if ((a = t.length) !== e.length) return !1;
                                for (; a--;) if (!d(t[a], e[a], n, r)) return !1
                            } else {
                                var c, u = k.keys(t), a = u.length;
                                if (k.keys(e).length !== a) return !1;
                                for (; a--;) if (c = u[a], !V(e, c) || !d(t[c], e[c], n, r)) return !1
                            }
                            return n.pop(), r.pop(), !0
                        }, k.isEqual = function (t, e) {
                            return d(t, e)
                        }, k.isEmpty = function (t) {
                            return null == t || (E(t) && (k.isArray(t) || k.isString(t) || k.isArguments(t)) ? 0 === t.length : 0 === k.keys(t).length)
                        }, k.isElement = function (t) {
                            return !(!t || 1 !== t.nodeType)
                        }, k.isArray = x || function (t) {
                            return "[object Array]" === w.call(t)
                        }, k.isObject = function (t) {
                            var e = typeof t;
                            return "function" == e || "object" == e && !!t
                        }, k.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error", "Symbol", "Map", "WeakMap", "Set", "WeakSet"], function (e) {
                            k["is" + e] = function (t) {
                                return w.call(t) === "[object " + e + "]"
                            }
                        }), k.isArguments(arguments) || (k.isArguments = function (t) {
                            return V(t, "callee")
                        }), g.document && g.document.childNodes),
                        x = ("function" != typeof /./ && "object" != typeof Int8Array && "function" != typeof x && (k.isFunction = function (t) {
                            return "function" == typeof t || !1
                        }), k.isFinite = function (t) {
                            return !k.isSymbol(t) && isFinite(t) && !isNaN(parseFloat(t))
                        }, k.isNaN = function (t) {
                            return k.isNumber(t) && isNaN(t)
                        }, k.isBoolean = function (t) {
                            return !0 === t || !1 === t || "[object Boolean]" === w.call(t)
                        }, k.isNull = function (t) {
                            return null === t
                        }, k.isUndefined = function (t) {
                            return void 0 === t
                        }, k.has = function (t, e) {
                            if (!k.isArray(e)) return V(t, e);
                            for (var n = e.length, r = 0; r < n; r++) {
                                var o = e[r];
                                if (null == t || !_.call(t, o)) return !1;
                                t = t[o]
                            }
                            return !!n
                        }, k.noConflict = function () {
                            return g._ = L, this
                        }, k.identity = function (t) {
                            return t
                        }, k.constant = function (t) {
                            return function () {
                                return t
                            }
                        }, k.noop = function () {
                        }, k.property = function (e) {
                            return k.isArray(e) ? function (t) {
                                return s(t, e)
                            } : t(e)
                        }, k.propertyOf = function (e) {
                            return null == e ? function () {
                            } : function (t) {
                                return k.isArray(t) ? s(e, t) : e[t]
                            }
                        }, k.matcher = k.matches = function (e) {
                            return e = k.extendOwn({}, e), function (t) {
                                return k.isMatch(t, e)
                            }
                        }, k.times = function (t, e, n) {
                            var r = Array(Math.max(0, t));
                            e = T(e, n, 1);
                            for (var o = 0; o < t; o++) r[o] = e(o);
                            return r
                        }, k.random = function (t, e) {
                            return null == e && (e = t, t = 0), t + Math.floor(Math.random() * (e - t + 1))
                        }, k.now = Date.now || function () {
                            return (new Date).getTime()
                        }, {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;"}),
                        B = k.invert(x), U = (k.escape = l(x), k.unescape = l(B), k.result = function (t, e, n) {
                            var r = (e = k.isArray(e) ? e : [e]).length;
                            if (!r) return k.isFunction(n) ? n.call(t) : n;
                            for (var o = 0; o < r; o++) {
                                var i = null == t ? void 0 : t[e[o]];
                                void 0 === i && (i = n, o = r), t = k.isFunction(i) ? i.call(t) : i
                            }
                            return t
                        }, 0), M = (k.uniqueId = function (t) {
                            var e = ++U + "";
                            return t ? t + e : e
                        }, k.templateSettings = {
                            evaluate: /<%([\s\S]+?)%>/g,
                            interpolate: /<%=([\s\S]+?)%>/g,
                            escape: /<%-([\s\S]+?)%>/g
                        }, /(.)^/), z = {"'": "'", "\\": "\\", "\r": "r", "\n": "n", "\u2028": "u2028", "\u2029": "u2029"},
                        G = /\\|'|\r|\n|\u2028|\u2029/g;
                    k.template = function (i, t, e) {
                        t = k.defaults({}, t = !t && e ? e : t, k.templateSettings);
                        var n,
                            e = RegExp([(t.escape || M).source, (t.interpolate || M).source, (t.evaluate || M).source].join("|") + "|$", "g"),
                            s = 0, a = "__p+='";
                        i.replace(e, function (t, e, n, r, o) {
                            return a += i.slice(s, o).replace(G, q), s = o + t.length, e ? a += "'+\n((__t=(" + e + "))==null?'':_.escape(__t))+\n'" : n ? a += "'+\n((__t=(" + n + "))==null?'':__t)+\n'" : r && (a += "';\n" + r + "\n__p+='"), t
                        }), a += "';\n", a = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + (a = t.variable ? a : "with(obj||{}){\n" + a + "}\n") + "return __p;\n";
                        try {
                            n = new Function(t.variable || "obj", "_", a)
                        } catch (t) {
                            throw t.source = a, t
                        }

                        function r(t) {
                            return n.call(this, t, k)
                        }

                        e = t.variable || "obj";
                        return r.source = "function(" + e + "){\n" + a + "}", r
                    }, k.chain = function (t) {
                        t = k(t);
                        return t._chain = !0, t
                    };
                    k.mixin = function (n) {
                        return k.each(k.functions(n), function (t) {
                            var e = k[t] = n[t];
                            k.prototype[t] = function () {
                                var t = [this._wrapped];
                                return R.apply(t, arguments), p(this, e.apply(k, t))
                            }
                        }), k
                    }, k.mixin(k), k.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (e) {
                        var n = y[e];
                        k.prototype[e] = function () {
                            var t = this._wrapped;
                            return n.apply(t, arguments), "shift" !== e && "splice" !== e || 0 !== t.length || delete t[0], p(this, t)
                        }
                    }), k.each(["concat", "join", "slice"], function (t) {
                        var e = y[t];
                        k.prototype[t] = function () {
                            return p(this, e.apply(this._wrapped, arguments))
                        }
                    }), k.prototype.value = function () {
                        return this._wrapped
                    }, k.prototype.valueOf = k.prototype.toJSON = k.prototype.value, k.prototype.toString = function () {
                        return String(this._wrapped)
                    }, "function" == typeof define && define.amd && define("underscore", [], function () {
                        return k
                    })
                }()
            }.call(this)
        }.call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }, {}],
    186: [function (t, e, n) {
        "use strict";

        function r(t) {
            o.call(this, t)
        }

        var o = t("lens/converter"), i = t("lens/article"), s = t("./nodes");
        (r.Prototype = function () {
            this.test = function (t) {
                return null != t.querySelector("article")
            }, this.createDocument = function () {
                return new i({nodeTypes: s})
            }, this.captionNew = function (e, n) {
                var t = e.doc, r = {
                        id: e.nextId("caption"),
                        source_id: n.getAttribute("id"),
                        type: "caption",
                        title: "",
                        children: []
                    }, o = n.querySelector("title"), i = (!o || (o = this.paragraph(e, o)) && (r.title = o.id), []),
                    o = n.querySelectorAll("p");
                return _.each(o, function (t) {
                    t.parentNode === n && (t = this.paragraph(e, t)) && i.push(t.id)
                }, this), r.children = i, t.create(r), r
            }, this.sanitizeXML = function (t) {
                for (var e = t.querySelectorAll("p"), n = 0; n < e.length; n++) {
                    var r = e[n], o = r.parentNode;
                    void 0 !== r && "" === r.innerHTML && "caption" == o.tagName && (r.innerHTML = ".")
                }
                for (var i = t.querySelectorAll("fig"), n = 0; n < i.length; n++) {
                    for (var s, a, c, u = i[n], l = !1, p = 0; p < u.children.length; p++) "caption" === u.children[p].tagName && (l = !0);
                    !1 === l && (s = document.createElement("caption"), a = document.createElement("p"), c = document.createTextNode("."), a.appendChild(c), a.style.visibility = "hidden", s.appendChild(a), u.appendChild(s))
                }
                return t
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r.prototype.constructor = r
    }, {"./nodes": 195, "lens/article": 5, "lens/converter": 128}],
    187: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.call(this, t, e)
        }

        var t = t("../../../node_modules/lens/substance/document/index"), o = t.Composite;
        r.type = {
            id: "abstract",
            parent: "content",
            properties: {title: "text", children: ["array", "paragraph"]}
        }, r.description = {
            name: "Abstract",
            remarks: ["Abstract"],
            properties: {children: {abstract: "abstract element"}}
        }, r.example = {
            id: "abstract_1",
            type: "abstract",
            children: {abstract: "abstract_id"}
        }, (r.Prototype = function () {
            this.getChildrenIds = function () {
                return this.properties.children
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, t.Node.defineProperties(r.prototype.constructor = r), e.exports = r
    }, {"../../../node_modules/lens/substance/document/index": 173}],
    188: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            i.call(this, t, e)
        }

        var o = t("../../../node_modules/lens/article/nodes/node/index").View,
            i = t("../../../node_modules/lens/article/nodes/composite/index").View;
        t("../../../node_modules/lens/substance/application/index").$$;
        (r.Prototype = function () {
            this.render = function () {
                o.prototype.render.call(this), this.content = document.createElement("div");
                var t, e = this.node.title;
                return null == e && void 0 === e || (void 0 === e.textContent & 0 == e.length ? ((e = document.createElement("div")).className = "content", (t = document.createElement("div")).className = "content-node text", e.appendChild(t), this.content.appendChild(e)) : 0 < e.length && ((t = this.createChildView(e).render().el).className += " title", this.content.appendChild(t))), 0 < this.node.children.length && (this.el.appendChild(this.content), this.renderChildren()), this
            }
        }).prototype = i.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {
        "../../../node_modules/lens/article/nodes/composite/index": 33,
        "../../../node_modules/lens/article/nodes/node/index": 91,
        "../../../node_modules/lens/substance/application/index": 160
    }],
    189: [function (t, e, n) {
        e.exports = {Model: t("./abstract"), View: t("./abstract_view")}
    }, {"./abstract": 187, "./abstract_view": 188}],
    190: [function (t, e, n) {
        function r(t, e) {
            o.call(this, t, e)
        }

        var o = t("lens/article/nodes").cover.View, i = t("lens/substance/application").$$;
        (r.Prototype = function () {
            this.render = function () {
                o.prototype.render.call(this);
                encodeURIComponent(window.location.href);
                var t = i(".intro.container", {children: [i(".intro-text", {html: '<i class="fa fa-exclamation"></i>&nbsp; &nbsp;<b>Internet Explorer is  only partially supported.</b>'})]}),
                    e = i(".intro.container", {children: [i(".intro-text", {html: '<i class="fa fa-exclamation"></i> <b>&nbsp; &nbsp; Minimum screen width of 1024px recommended for best user experience</b>'})]}),
                    n = navigator.userAgent;
                return (-1 < n.indexOf("MSIE ") || -1 < n.indexOf("Trident/")) && this.content.insertBefore(t, this.content.firstChild), window.screen.width < 1024 && this.content.insertBefore(e, this.content.firstChild), this
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r.prototype.constructor = r
    }, {"lens/article/nodes": 76, "lens/substance/application": 160}],
    191: [function (t, e, n) {
        "use strict";
        var r = t("lens/article/nodes").cover.Model;
        e.exports = {Model: r, View: t("./cover_view")}
    }, {"./cover_view": 190, "lens/article/nodes": 76}],
    192: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.Composite.call(this, t, e)
        }

        var o = t("../../../node_modules/lens/substance/document/index");
        r.type = {
            parent: "content",
            properties: {
                source_id: "string",
                label: "string",
                url: "string",
                caption: "caption",
                position: "string",
                attrib: "string"
            }
        }, r.config = {zoomable: !0}, r.description = {
            name: "Figure",
            remarks: ["A figure is a figure is figure."],
            properties: {
                label: "Label used as header for the figure cards",
                url: "Image url",
                caption: "A reference to a caption node that describes the figure",
                attrib: "Figure attribution"
            }
        }, r.example = {
            id: "figure_1",
            label: "Figure 1",
            url: "http://example.com/fig1.png",
            caption: "caption_1"
        }, (r.Prototype = function () {
            this.hasCaption = function () {
                return !!this.properties.caption
            }, this.getChildrenIds = function () {
                var t = [];
                return this.properties.caption && t.push(this.properties.caption), t
            }, this.getCaption = function () {
                if (this.properties.caption) return this.document.get(this.properties.caption)
            }, this.getHeader = function () {
                return this.properties.label
            }, this.includeInToc = function () {
                return !0
            }
        }).prototype = o.Composite.prototype, r.prototype = new r.Prototype, o.Node.defineProperties((r.prototype.constructor = r).prototype, Object.keys(r.type.properties)), e.exports = r
    }, {"../../../node_modules/lens/substance/document/index": 173}],
    193: [function (t, e, n) {
        "use strict";

        function r(t, e, n) {
            i.call(this, t, e), a.call(this, n)
        }

        var o = t("underscore"), i = t("../../../node_modules/lens/article/nodes/composite/index").View,
            s = t("../../../node_modules/lens/substance/application/index").$$,
            a = t("../../../node_modules/lens/article/resource_view");
        (r.Prototype = function () {
            o.extend(this, a.prototype), this.isZoomable = !0, this.renderBody = function () {
                this.content.appendChild(s(".label", {text: this.node.label}));
                var t = this.node.url;
                t && (t = s(".image-wrapper", {
                    children: [s("a", {
                        href: t,
                        target: "_blank",
                        class: "toggle toggle-fullscreen",
                        children: [s("img", {src: t})]
                    })]
                }), this.content.appendChild(t)), this.renderChildren(), this.node.attrib && this.content.appendChild(s(".figure-attribution", {text: this.node.attrib}))
            }, this.renderLabel = function () {
                var t = s(".name", {href: "#"});
                return this.renderAnnotatedText([this.node.id, "label"], t), t
            }
        }).prototype = i.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {
        "../../../node_modules/lens/article/nodes/composite/index": 33,
        "../../../node_modules/lens/article/resource_view": 126,
        "../../../node_modules/lens/substance/application/index": 160,
        underscore: 185
    }],
    194: [function (t, e, n) {
        arguments[4][59][0].apply(n, arguments)
    }, {"./figure": 192, "./figure_view": 193, dup: 59}],
    195: [function (t, e, n) {
        e.exports = {
            abstract: t("./abstract"),
            cover: t("./cover"),
            figure: t("./figure"),
            sec_meta: t("./sec_meta"),
            speech: t("./speech"),
            strike: t("./strike"),
            table: t("./table")
        }
    }, {
        "./abstract": 189,
        "./cover": 191,
        "./figure": 194,
        "./sec_meta": 196,
        "./speech": 199,
        "./strike": 202,
        "./table": 204
    }],
    196: [function (t, e, n) {
        "use strict";
        e.exports = {Model: t("./sec_meta"), View: t("./sec_meta_view")}
    }, {"./sec_meta": 197, "./sec_meta_view": 198}],
    197: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            i.call(this, t, e)
        }

        var o = t("underscore"), t = t("../../../node_modules/lens/substance/document/index"), i = t.Composite;
        r.type = {
            id: "sec_meta",
            parent: "content",
            properties: {
                children: {abstract: "abstract"},
                authors: ["array", "paragraph"],
                abstract: ["array", "abstract"]
            }
        }, r.description = {
            name: "Section",
            remarks: ["Sectin Element for metadata"],
            properties: {children: {abstract: "abstract element"}}
        }, r.example = {
            id: "sec_meta_1",
            type: "sec_meta",
            children: {abstract: "abstract_id"}
        }, (r.Prototype = function () {
            this.getChildrenIds = function () {
                return this.properties.children
            }, this.getAuthors = function () {
                return o.map(this.properties.authors, function (t) {
                    return this.document.get(t)
                }, this)
            }, this.getAbstract = function () {
                return o.map(this.properties.abstract, function (t) {
                    return this.document.get(t)
                }, this)
            }
        }).prototype = i.prototype, r.prototype = new r.Prototype, t.Node.defineProperties(r.prototype.constructor = r), e.exports = r
    }, {"../../../node_modules/lens/substance/document/index": 173, underscore: 185}],
    198: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            i.call(this, t, e)
        }

        var o = t("underscore"),
            i = (t("../../../node_modules/lens/article/nodes/node/index").View, t("../../../node_modules/lens/article/nodes/composite/index").View),
            s = t("../../../node_modules/lens/substance/application/index").$$;
        (r.Prototype = function () {
            this.render = function () {
                var t = this.node, e = (this.content = document.createElement("div"), s(".authors", {
                        children: o.map(t.getAuthors(), function (t) {
                            t = this.viewFactory.createView(t).render().el;
                            return this.content.appendChild(t), t
                        }, this)
                    })),
                    e = (e.appendChild(s(".content-node.text.plain", {children: [s(".content", {text: this.node.document.on_behalf_of})]})), this.content.appendChild(e), s(".abstract", {
                        children: o.map(t.getAbstract(), function (t) {
                            t = this.viewFactory.createView(t).render().el;
                            return this.content.appendChild(t), t
                        }, this)
                    }));
                return 0 < t.properties.abstract.length && this.content.appendChild(e), this.el.appendChild(this.content), this
            }
        }).prototype = i.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {
        "../../../node_modules/lens/article/nodes/composite/index": 33,
        "../../../node_modules/lens/article/nodes/node/index": 91,
        "../../../node_modules/lens/substance/application/index": 160,
        underscore: 185
    }],
    199: [function (t, e, n) {
        "use strict";
        e.exports = {Model: t("./speech"), View: t("./speech_view")}
    }, {"./speech": 200, "./speech_view": 201}],
    200: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.call(this, t, e)
        }

        var t = t("../../../node_modules/lens/substance/document/index"), o = t.Composite;
        r.type = {
            id: "speech",
            parent: "content",
            properties: {source_id: "string", label: "string", children: ["array", "paragraph"], speaker: ["content"]}
        }, r.description = {
            name: "Speech",
            remarks: ["A speech type."],
            properties: {label: "string", children: "0..n Paragraph nodes"}
        }, r.example = {
            id: "speech_1",
            type: "speech",
            label: "Speech 1",
            children: ["paragraph_1", "paragraph_2"]
        }, (r.Prototype = function () {
            this.getChildrenIds = function () {
                return this.properties.children
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, t.Node.defineProperties(r.prototype.constructor = r), e.exports = r
    }, {"../../../node_modules/lens/substance/document/index": 173}],
    201: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.call(this, t, e)
        }

        var a = t("../../../node_modules/lens/article/nodes/node/index").View,
            o = t("../../../node_modules/lens/article/nodes/composite/index").View;
        t("../../../node_modules/lens/substance/application/index").$$;
        (r.Prototype = function () {
            this.render = function () {
                a.prototype.render.call(this), (t = document.createElement("table")).setAttribute("class", "speeches"), e = document.createElement("tr");
                var t, e, n = this.node.speaker;
                for (i = 0; i < n.length; i++) (r = document.createElement("td")).setAttribute("class", "speaker"), r.innerText = n[i].textContent;
                e.appendChild(r);
                for (var r, o = this.node.getChildrenIds(), i = 0; i < o.length; i++) {
                    (r = document.createElement("td")).setAttribute("class", "speech");
                    var s = this.createChildView(o[i]).render().el;
                    r.appendChild(s), e.appendChild(r)
                }
                return t.appendChild(e), this.content.appendChild(t), this.el.appendChild(this.content), this
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {
        "../../../node_modules/lens/article/nodes/composite/index": 33,
        "../../../node_modules/lens/article/nodes/node/index": 91,
        "../../../node_modules/lens/substance/application/index": 160
    }],
    202: [function (t, e, n) {
        e.exports = {
            Model: t("./strike.js"),
            View: t("../../../node_modules/lens/article/nodes/annotation/annotation_view.js")
        }
    }, {"../../../node_modules/lens/article/nodes/annotation/annotation_view.js": 9, "./strike.js": 203}],
    203: [function (t, e, n) {
        function r(t, e) {
            o.call(this, t, e)
        }

        var o = t("../../../node_modules/lens/article/nodes/annotation/annotation");
        r.type = {id: "strike", parent: "annotation", properties: {}}, (r.Prototype = function () {
        }).prototype = o.prototype, ((r.prototype = new r.Prototype).constructor = r).fragmentation = o.DONT_CARE, e.exports = r
    }, {"../../../node_modules/lens/article/nodes/annotation/annotation": 8}],
    204: [function (t, e, n) {
        "use strict";
        e.exports = {Model: t("./table"), View: t("./table_view")}
    }, {"./table": 205, "./table_view": 206}],
    205: [function (t, e, n) {
        t("underscore");

        function r(t, e) {
            o.call(this, t, e)
        }

        var t = t("../../../node_modules/lens/substance/document/index"), o = t.Composite;
        r.type = {
            id: "table",
            parent: "content",
            properties: {
                source_id: "string",
                label: "string",
                children: "object",
                footers: ["array", "string"],
                caption: "caption",
                table_attributes: "object"
            }
        }, r.config = {zoomable: !0}, r.description = {
            name: "HTMLTable",
            remarks: ["A table figure which is expressed in HTML notation"],
            properties: {
                source_id: "string",
                label: "Label shown in the resource header.",
                title: "Full table title",
                children: "object",
                footers: "HTMLTable footers expressed as an array strings",
                caption: "References a caption node, that has all the content",
                table_attributes: "Named Node map of attributes"
            }
        }, r.example = {
            id: "table_1",
            type: "table",
            label: "HTMLTable 1.",
            title: "Lorem ipsum table",
            children: "object",
            footers: [],
            caption: "caption_1"
        }, (r.Prototype = function () {
            this.getChildrenIds = function () {
                return this.properties.children
            }, this.getCaption = function () {
                if (this.properties.caption) return this.document.get(this.properties.caption)
            }, this.getHeader = function () {
                return this.properties.label
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, t.Node.defineProperties(r.prototype.constructor = r), e.exports = r
    }, {"../../../node_modules/lens/substance/document/index": 173, underscore: 185}],
    206: [function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.call(this, t, e)
        }

        var g = t("../../../node_modules/lens/article/nodes/node/index").View,
            o = t("../../../node_modules/lens/article/nodes/composite/index").View;
        t("../../../node_modules/lens/substance/application/index").$$;
        (r.Prototype = function () {
            this.render = function () {
                g.prototype.render.call(this), e = document.createElement("table");
                var t, e, n, r, o, i, s = this.node.properties.table_attributes;
                if (0 < s.length) for (var a = 0; a < s.length; a++) e.setAttribute(s[a].nodeName, s[a].nodeValue);
                null === s.getNamedItem("specific-use") ? e.setAttribute("class", "gitter-tabelle") : e.setAttribute("class", s.getNamedItem("specific-use").nodeValue);
                var c = this.node.getChildrenIds();
                if (void 0 !== c) for (var u in c) for (o in n = c[u], r = document.createElement("tr"), n) {
                    var l = document.createElement("td"), p = n[o];
                    for (i in p) {
                        var h = p[i].nodes, d = p[i].attributes;
                        if (void 0 !== h) {
                            for (a = 0; a < h.length; a++) t = this.createChildView(h[a].id).render().el, l.appendChild(t);
                            for (var f = 0; f < d.length; f++) l.setAttribute(d[f].nodeName, d[f].nodeValue)
                        }
                    }
                    r.appendChild(l), e.appendChild(r)
                }
                return this.content.appendChild(e), this.el.appendChild(this.content), this
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r
    }, {
        "../../../node_modules/lens/article/nodes/composite/index": 33,
        "../../../node_modules/lens/article/nodes/node/index": 91,
        "../../../node_modules/lens/substance/application/index": 160
    }],
    207: [function (t, e, n) {
        "use strict";

        function r(t) {
            o.call(this, t)
        }

        var o = t("lens/reader"), i = o.getDefaultPanels(), s = t("./custom_converter");
        (r.Prototype = function () {
            this.getConverters = function (t) {
                return [new s(t)]
            }, this.getPanels = function () {
                return i.slice(0)
            }
        }).prototype = o.prototype, r.prototype = new r.Prototype, e.exports = r.prototype.constructor = r
    }, {"./custom_converter": 186, "lens/reader": 133}]
}, {}, [1]);