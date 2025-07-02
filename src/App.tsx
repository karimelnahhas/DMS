import React, { useState } from 'react'
import { FileText, Upload, Search, Filter, Download, Eye, Trash2, Calendar, User, FileIcon } from 'lucide-react'
import { format } from 'date-fns'

interface Document {
  id: number
  name: string
  type: string
  size: string
  modifiedDate: Date
  author: string
  description: string
}

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilter, setShowFilter] = useState(false)
  
  // Sample documents data
  const [documents] = useState<Document[]>([
    {
      id: 1,
      name: "Project Proposal 2024",
      type: "PDF",
      size: "2.4 MB",
      modifiedDate: new Date(2024, 0, 15),
      author: "John Smith",
      description: "Comprehensive project proposal for the upcoming fiscal year including budget allocations and timeline."
    },
    {
      id: 2,
      name: "Financial Report Q4",
      type: "XLSX",
      size: "1.8 MB",
      modifiedDate: new Date(2024, 0, 12),
      author: "Sarah Johnson",
      description: "Quarterly financial report with detailed analysis of revenue, expenses, and profit margins."
    },
    {
      id: 3,
      name: "Marketing Strategy",
      type: "DOCX",
      size: "956 KB",
      modifiedDate: new Date(2024, 0, 10),
      author: "Mike Davis",
      description: "Strategic marketing plan for product launch including target demographics and campaign timeline."
    },
    {
      id: 4,
      name: "Technical Specifications",
      type: "PDF",
      size: "3.2 MB",
      modifiedDate: new Date(2024, 0, 8),
      author: "Emily Chen",
      description: "Detailed technical specifications and requirements for the new software platform."
    },
    {
      id: 5,
      name: "Meeting Minutes",
      type: "DOCX",
      size: "245 KB",
      modifiedDate: new Date(2024, 0, 5),
      author: "Robert Wilson",
      description: "Minutes from the quarterly board meeting including key decisions and action items."
    },
    {
      id: 6,
      name: "User Manual v2.1",
      type: "PDF",
      size: "4.1 MB",
      modifiedDate: new Date(2024, 0, 3),
      author: "Lisa Anderson",
      description: "Updated user manual with new features and troubleshooting guide for end users."
    }
  ])

  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-8 w-8 text-red-500" />
      case 'docx':
        return <FileIcon className="h-8 w-8 text-blue-500" />
      case 'xlsx':
        return <FileIcon className="h-8 w-8 text-green-500" />
      default:
        return <FileText className="h-8 w-8 text-gray-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return 'bg-red-100 text-red-800'
      case 'docx':
        return 'bg-blue-100 text-blue-800'
      case 'xlsx':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-primary-600 mr-3" />
              <h1 className="text-xl font-semibold text-foreground">Document Management System</h1>
            </div>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 hover:shadow-md">
              <Upload className="h-4 w-4" />
              Upload Document
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search documents by name, description, or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
            />
          </div>
          <button 
            onClick={() => setShowFilter(!showFilter)}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>

        {/* Filter Panel */}
        {showFilter && (
          <div className="mb-6 p-4 bg-white rounded-lg border border-border">
            <h3 className="font-medium mb-3">Filter Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">File Type</label>
                <select className="w-full border border-border rounded-md px-3 py-2">
                  <option>All Types</option>
                  <option>PDF</option>
                  <option>DOCX</option>
                  <option>XLSX</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <select className="w-full border border-border rounded-md px-3 py-2">
                  <option>All Dates</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <select className="w-full border border-border rounded-md px-3 py-2">
                  <option>All Authors</option>
                  <option>John Smith</option>
                  <option>Sarah Johnson</option>
                  <option>Mike Davis</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Showing {filteredDocuments.length} of {documents.length} documents
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm border border-border rounded hover:bg-gray-50 transition-colors">
              Grid View
            </button>
            <button className="px-3 py-1 text-sm border border-border rounded hover:bg-gray-50 transition-colors">
              List View
            </button>
          </div>
        </div>

        {/* Documents Grid */}
        {filteredDocuments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="bg-white rounded-lg border border-border p-6 hover:shadow-lg transition-all duration-200 cursor-pointer group">
                <div className="flex items-center justify-between mb-4">
                  {getFileIcon(doc.type)}
                  <span className={`text-xs px-2 py-1 rounded font-medium ${getTypeColor(doc.type)}`}>
                    {doc.type}
                  </span>
                </div>
                
                <h3 className="font-medium text-foreground mb-2 group-hover:text-primary-600 transition-colors">
                  {doc.name}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {doc.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {format(doc.modifiedDate, 'MMM dd, yyyy')}
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <User className="h-3 w-3 mr-1" />
                    {doc.author}
                  </div>
                  <div className="text-xs text-gray-500">
                    Size: {doc.size}
                  </div>
                </div>
                
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button className="flex-1 bg-primary-50 hover:bg-primary-100 text-primary-700 px-3 py-2 rounded text-sm flex items-center justify-center gap-1 transition-colors">
                    <Eye className="h-3 w-3" />
                    View
                  </button>
                  <button className="bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm flex items-center justify-center transition-colors">
                    <Download className="h-3 w-3" />
                  </button>
                  <button className="bg-red-50 hover:bg-red-100 text-red-700 px-3 py-2 rounded text-sm flex items-center justify-center transition-colors">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No documents found' : 'No documents uploaded'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? `No documents match your search for "${searchTerm}"`
                : 'Get started by uploading your first document.'
              }
            </p>
            {!searchTerm && (
              <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto transition-all duration-200 hover:shadow-md">
                <Upload className="h-4 w-4" />
                Upload Document
              </button>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Document Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App